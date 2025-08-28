import { PC } from "@repo/db/connect"
import axios from "axios";
import { Request, Response } from "express"
import { transporter } from "./transporter.js";
import nodemailer from "nodemailer"

export const getURl = async (req: Request, res: Response) => {
    const fetchURL = await PC.websites.findMany();
    let urls: any = [];
    fetchURL.forEach((e) => urls.push(
        e.url
    ))
    console.log(urls);
    setInterval(async () => {
        for(const i of urls){
            const url = i.startsWith("http") ? i : `https://${i}`;
            await axios.get(url).then(()=>{
                console.log("working");
            }).catch(async (e)=>{
                console.log(`${i} Not working: ${e}`);
                const id = await PC.websites.findFirst({
                    where: {url: i}
                });
                const email = await PC.service.findFirst({
                    where: {websiteId: id?.id}
                })
                console.log(process.env.SENDER_EMAIL);
                console.log(email?.email);
                try {
                    const info = await transporter.sendMail({
                    from: process.env.SENDER_EMAIL,
                    to: email?.email,
                    subject: "Website downtime",
                    text: "Your website is down, please check", 
                    html: "<b>Your website is down, please check</b>", 
                    });

                    console.log("Message sent: %s", info.messageId);
                    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
                } catch (err) {
                    console.error("Error while sending mail", err);
                }
            })
        }
    }, 10000);
    console.log("Completed");
}