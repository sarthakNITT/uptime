import { PC } from "@repo/db/connect"
import { NextResponse } from "next/server";

export async function GET () {
    try {
        await PC.$connect();
        console.log("connected");
        return NextResponse.json({
            message: "connected"
        })
    } catch (error) {
        console.log(error);
        return NextResponse.json({
            message: "Not connected"
        })
    }
}