// external imports
import { NextFunction, Request, Response } from "express";

// internal imports============
import app from "./utils/app";
import dbconnection from "./utils/dbconnection";
import * as error_handler from "./utils/error_handler";

// database connection
dbconnection();

// error handler
app.use(error_handler.routeNotFound);

app.use(error_handler.allErrorHandler);

app.listen(process.env.port, () => {
  console.log(`Example app listening on port ${process.env.port}`);
});
