import { currentUser } from "@clerk/nextjs/server";
import { PC } from "@repo/db/connect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();
    if (!user?.username) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const dbUser = await PC.user.findFirst({ where: { username: user.username } });
    if (!dbUser) {
      return NextResponse.json({ message: "User not found in DB" }, { status: 404 });
    }

    const services = await PC.service.findMany({ where: { userId: dbUser.id } });
    const websites = await PC.websites.findMany({ where: { userId: dbUser.id } });

    const websiteById = new Map<string, any>();
    websites.forEach(w => websiteById.set(w.id, w));

    const monitors = services.map(service => {
      const site = service.websiteId ? websiteById.get(service.websiteId) : undefined;

      const rawStatus = site?.status ? String(site.status).toLowerCase() : "unknown";
      const status = rawStatus === "up" || rawStatus === "down" || rawStatus === "paused"
        ? rawStatus
        : "unknown";

      const rtParsed = site?.responseTime ? parseInt(String(site.responseTime), 10) : NaN;
      const responseTime = Number.isFinite(rtParsed) ? rtParsed : null;

      const uptime30d = site ? ((site as any).uptime30d ?? (site as any).uptime ?? null) : null;
      const checkCount = site ? ((site as any).checkCount ?? (site as any).checks ?? (site as any).totalChecks ?? null) : null;

      return {
        websiteId: site?.id ?? null,
        status,
        uptime30d,
        responseTime,
        lastChecked: site?.lastChecked ?? null,
        checkCount
      };
    });

    const monitorsWithSite = monitors.filter(m => m.websiteId !== null);

    const totalMonitors = monitorsWithSite.length;
    const servicesOnline = monitorsWithSite.filter(m => m.status === "up").length;
    const activeAlerts = monitorsWithSite.filter(m => m.status === "down").length;

    const responseTimes = monitorsWithSite.map(m => m.responseTime).filter((v): v is number => v !== null);
    const averageResponseTime = responseTimes.length > 0
      ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length)
      : 0;

    const uptimeValues = monitorsWithSite
      .map(m => (m.uptime30d !== null && m.uptime30d !== undefined ? Number(m.uptime30d) : null))
      .filter((v): v is number => v !== null && !Number.isNaN(v));

    let averageUptime: number | null = null;
    if (uptimeValues.length > 0) {
      const sum = uptimeValues.reduce((acc, v) => acc + Math.max(0, Math.min(100, v)), 0);
      averageUptime = Math.round((sum / uptimeValues.length) * 100) / 100;
    } else if (totalMonitors > 0) {
      averageUptime = Math.round((servicesOnline / totalMonitors) * 10000) / 100;
    }

    const explicitChecks = monitorsWithSite
      .map(m => (m.checkCount !== null && m.checkCount !== undefined ? Number(m.checkCount) : null))
      .filter((v): v is number => v !== null && !Number.isNaN(v));

    const totalChecks = explicitChecks.length > 0
      ? explicitChecks.reduce((a, b) => a + b, 0)
      : monitorsWithSite.filter(m => m.lastChecked !== null).length;

    const payload = {
      totalMonitors,
      averageUptime,
      activeAlerts,
      averageResponseTime,
      servicesOnline,
      totalChecks
    };

    return NextResponse.json(payload);
  } catch (err: any) {
    console.error("Error in getServices metrics:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
