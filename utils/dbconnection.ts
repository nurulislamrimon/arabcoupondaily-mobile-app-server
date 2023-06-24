import mongoose from "mongoose";

export default function dbconnection() {
  mongoose
    .connect(process.env.db_local || "")
    .then(() => console.log("Database connected!"))
    .catch((err) => {
      throw new Error(err);
    });
}
