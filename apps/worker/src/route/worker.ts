import express from "express"
import { getURl } from "../controller/worker.js";
export const router = express.Router();

router.get("/getUrls", getURl);