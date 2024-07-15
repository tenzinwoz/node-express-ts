import express from "express";
const router = express.Router();

import v1ApiRoutes from "./routes";

router.use("/api", v1ApiRoutes);

export default router;
