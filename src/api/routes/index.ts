import express from "express";
const router = express.Router();

//API Routes
import userRoutes from "./users";

router.use("/users", userRoutes);

export default router;
