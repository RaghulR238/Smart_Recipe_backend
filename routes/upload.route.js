import express from "express";
import { deleteUser } from "../controller/user.controller.js";
import { verifyToken } from "../middleware/jwt.js";
import { createUpload, deleteUpload, getUpload, getUploads } from "../controller/upload.controller.js";


const router =express.Router();

router.post("/up",createUpload);
router.delete("/:id",deleteUpload);
router.get("/all",getUpload);
router.get("/",getUploads);

export default router
