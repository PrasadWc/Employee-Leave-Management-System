import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";

import userRoutes from "./routes/userRoutes.js";
import leaveRoutes from "./routes/leaveRoutes.js"

dotenv.config();

//MongoDB Connection
mongoose.connect(process.env.DB_URL).then(() => {
    console.log("Connected to Database");
  })
  .catch((err) => {
    console.log(err);
  });

  const app = express();
  app.use(cookieParser());
  app.use(express.json());

  app.use(
    cors({
        origin: "http://localhost:5173",
        credentials: true, 
    })
);

app.listen(6060, () => {
    console.log("server listening on port 6060");
  });

//Routes
app.use("/users", userRoutes);
app.use("/leaves", leaveRoutes);