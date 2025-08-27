import { PC } from "@repo/db/connect";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
    await PC.$connect().then(()=>{
        console.log("Connected to db");
    });
    const {phone, email, url} = await req.json();
    const userId = "1";
    console.log(1);
    try {
        await PC.$transaction(async (tx) => {
            const service = await tx.service.create({
                data: {
                    phone: phone,
                    email: email,
                    userId: userId,
                }
            })
        
            const website = await tx.websites.create({
                data: {
                    url: url,
                    user: {connect: {id: userId}}
                }
            })
        
            await tx.service.update({
                where: {id: service.id},
                data: {websiteId: website.id}
            })
        })
        
        return NextResponse.json({
            message: "Transaction compelted: Check Db"
        })
    } catch (error) {
        console.log("heeeelllloooooo" + error);
        
        return NextResponse.json({
            message: error
        })
    }
}