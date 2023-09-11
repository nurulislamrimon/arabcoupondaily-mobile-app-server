import express, { Request, Response, urlencoded } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

// dot env configuration
import dotenv from "dotenv";
dotenv.config();
// create app
const app = express();
// configuration
app.use(express.json());
app.use(cookieParser());
app.use(cors());
app.use(urlencoded({ extended: true }));
// home route
app.get("/", (req: Request, res: Response) => {
  res.send({ status: "success", data: "Welcome to Arabcoupondaily!" });
  console.log("Welcome to Arabcoupondaily");
});

export default app;
