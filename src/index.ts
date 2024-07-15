import express from "express";
import apiRoutes from "./api";

const app = express();

const PORT = 3000;

//Accept JSON body
app.use(express.json());

//API Routes
app.use("/", apiRoutes);

app.listen(PORT, () => {
  console.log(`Running on port ${PORT}`);
});
