import { PC } from "@repo/db/connect"
import { Request, Response } from "express"

export const getURl = async (req: Request, res: Response) => {
    const fetchURL = await PC.websites.findMany();
    let urls: any = [];
    fetchURL.forEach((e) => urls.push(e.url))
    console.log(urls);
}