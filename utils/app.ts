import express, { Request, Response } from "express";

// dot env configuration
import dotenv from "dotenv";
dotenv.config();
// create app
const app = express();
// home route
app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
