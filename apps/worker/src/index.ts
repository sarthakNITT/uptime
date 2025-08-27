import { PC } from "@repo/db/connect";
import express, { Request, Response } from "express";
import { router } from "./route/worker.js";

const app = express();

app.use(express.json());
app.use("/worker", router);

app.get("/", (req:Request ,res: Response)=>{
    res.send("hheellllooooo")
})
 
await PC.$connect().then(()=>{
    console.log("Database connected successfully");
    app.listen(3001, ()=>{
        console.log("Server running on port: 3001");
    })
}).catch((e)=>{
    console.log(`Error while connecting to database: ${e}`);
})