import { currentUser } from "@clerk/nextjs/server";
import { PC } from "@repo/db/connect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await PC.$connect().then(() => console.log("Connected to db"));

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

    const websiteMap = new Map<string, any>();
    websites.forEach((w) => websiteMap.set(w.id, w));

    const monitors: {
      websiteId: string | null;
      status: "UP" | "DOWN";
      responseTime: number | null;
      lastChecked: string | null;
      checkCount: number | null;
    }[] = [];

    for (const svc of services) {
      const site = svc.websiteId ? websiteMap.get(svc.websiteId) : undefined;
      if (!site) continue;

      const statusRaw = site.status ? String(site.status) : "";
      const status = statusRaw === "UP" ? "UP" : "DOWN";

      let responseTime: number | null = null;
      if (site.avgResponseMs !== null && site.avgResponseMs !== undefined) {
        responseTime = Number(site.avgResponseMs);
      } else if (site.responseTime) {
        const p = parseInt(String(site.responseTime), 10);
        responseTime = Number.isFinite(p) ? p : null;
      }

      const checkCount = (site as any).checkCount ?? null;

      monitors.push({
        websiteId: site.id ?? null,
        status,
        responseTime,
        lastChecked: site.lastChecked ? new Date(site.lastChecked).toISOString() : null,
        checkCount,
      });
    }

    const monitorsWithSite = monitors;

    const totalMonitors = monitorsWithSite.length;
    const servicesOnline = monitorsWithSite.filter((m) => m.status === "UP").length;
    const activeAlerts = monitorsWithSite.filter((m) => m.status === "DOWN").length;

    const responseTimes = monitorsWithSite
      .map((m) => m.responseTime)
      .filter((v): v is number => v !== null && !Number.isNaN(v));

    const averageResponseTime =
      responseTimes.length > 0
        ? Math.round(responseTimes.reduce((a, b) => a + b, 0) / responseTimes.length)
        : 0;

    let averageUptime: number | null = null;
    if (totalMonitors > 0) {
      averageUptime = Math.round((servicesOnline / totalMonitors) * 10000) / 100;
    }

    let totalChecks = 0;
    const websiteIds = websites.map((w) => w.id);
    if (websiteIds.length > 0) {
      totalChecks = await PC.websiteLog.count({
        where: { websiteId: { in: websiteIds } },
      });
    }

    const payload = {
      totalMonitors,
      averageUptime,
      activeAlerts,
      averageResponseTime,
      servicesOnline,
      totalChecks,
    };

    return NextResponse.json(payload);
  } catch (err) {
    console.error("Error in getServices metrics:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
