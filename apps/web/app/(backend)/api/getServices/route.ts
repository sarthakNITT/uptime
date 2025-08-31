import { currentUser } from "@clerk/nextjs/server";
import { PC } from "@repo/db/connect";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await currentUser();

    if (!user?.username) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const dbUser = await PC.user.findFirst({
      where: { username: user.username }
    });

    if (!dbUser) {
      return NextResponse.json({ message: "User not found in DB" }, { status: 404 });
    }

    const services = await PC.service.findMany({
      where: { userId: dbUser.id }
    });

    const websites = await PC.websites.findMany({
      where: { userId: dbUser.id }
    });

    const monitors = services.map(service => {
      const site = websites.find(w => w.id === service.websiteId);

      return {
        id: service.id,
        name: site?.url ?? "Unknown",
        url: site?.url ?? "",
        status: site?.status as "UP" | "DOWN",
        uptime30d: Math.random() * (100 - 95) + 95,
        responseTime: site?.responseTime ? parseInt(site.responseTime) : 0,
        lastChecked: site?.lastChecked ? site.lastChecked.toISOString() : ""
      };
    });

    return NextResponse.json(monitors);
  } catch (err) {
    console.error("Error in getServices:", err);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
