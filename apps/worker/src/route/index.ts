import express from "express"
import { getURl } from "../controller/index.js";
export const router = express.Router();

router.get("/getUrls", getURl);