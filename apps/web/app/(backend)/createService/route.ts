import { currentUser } from "@clerk/nextjs/server";
import { PC } from "@repo/db/connect";
import { NextRequest, NextResponse } from "next/server";

export async function POST (req: NextRequest) {
    await PC.$connect().then(()=>{
        console.log("Connected to db");
    });
    const {phone, email, url} = await req.json();

    const user = await currentUser();
    const findDb = await PC.user.findFirst({
        where: {username: user?.username ?? ""}
    })
    console.log(user?.username);
    console.log(findDb?.username);
    if (!findDb?.id) {
    return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    console.log(1);
    try {
        await PC.$transaction(async (tx) => {
            const service = await tx.service.create({
                data: {
                    phone: phone,
                    email: email,
                    userId: findDb?.id,
                }
            })
        
            const website = await tx.websites.create({
                data: {
                    url: url,
                    user: {connect: {id: findDb?.id}}
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