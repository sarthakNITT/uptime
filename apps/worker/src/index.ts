import { PC } from "@repo/db/connect";
import express from "express";
import axios from "axios";
import { transporter } from "./controller/transporter.js";
import nodemailer from "nodemailer"

const app = express();

app.use(express.json());
setInterval(async () => {
    try {
        const fetchURL = await PC.websites.findMany();
        let urls: any = [];
        fetchURL.forEach((e) => urls.push(
            e.url
        ))
        console.log(urls);
        for(const i of urls){
            const url = i.startsWith("http") ? i : `https://${i}`;
            const hittingTime = Date.now();
            await axios.get(url).then( async ()=>{
                const resultTime = Date.now();
                console.log("working");
                await PC.websites.update({
                    where: {url: i},
                    data: {
                        status: "UP",
                        lastChecked: new Date(resultTime),
                        responseTime: `${resultTime - hittingTime}`
                    }
                })
            }).catch(async (e)=>{
                const resultTime = Date.now();
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
                    await PC.websites.update({
                        where: {url: i},
                        data: {
                            status: "DOWN",
                            lastChecked: new Date(resultTime),
                            responseTime: `${resultTime - hittingTime}`
                        }
                    })

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
    } catch (error) {
        console.error("Unexpected error in worker loop:", error);
    }
}, 10000);
console.log("Completed");

await PC.$connect().then(()=>{
    console.log("Database connected successfully");
    app.listen(3001, ()=>{
        console.log("Server running on port: 3001");
    })
}).catch((e)=>{
    console.log(`Error while connecting to database: ${e}`);
})