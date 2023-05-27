import express, { Request, Response } from "express";

// dot env configuration
import dotenv from "dotenv";
dotenv.config();
// create app
const app = express();

app.use(express.json());
// home route
app.get("/", (req: Request, res: Response) => {
  res.send({ status: "success", data: "Welcome to Arabcoupondaily!" });
  console.log("Welcome to Arabcoupondaily");
});

export default app;
