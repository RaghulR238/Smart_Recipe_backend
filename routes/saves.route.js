import express from "express";
import { verifyToken } from "../middleware/jwt.js";
import { createSaves, deleteSaves, getSaves } from "../controller/saves.controller.js";



const router =express.Router();

router.post("/create",createSaves);
router.post("/delete",deleteSaves);
router.get("/",getSaves);


export default router
