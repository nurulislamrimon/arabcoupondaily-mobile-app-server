// external imports
import colors from "@colors/colors";

// internal imports============
import app from "./app";
import dbconnection from "./utils/dbconnection";
import * as error_handler from "./middlewares/error_handler";
import userRouter from "./modules/user.module/user.router";
import storeRouter from "./modules/store.module/store.router";
import postRouter from "./modules/post.module/post.router";
import carouselRouter from "./modules/carousel.module/carousel.router";
import contactRouter from "./modules/Contact.module/Contact.router";
import administratorRouter from "./modules/administrators.module/administrators.router";

// database connection======
dbconnection();

// routes=========

app.use("/api/v1/user", userRouter);

app.use("/api/v1/store", storeRouter);

app.use("/api/v1/post", postRouter);

app.use("/api/v1/carousel", carouselRouter);

app.use("/api/v1/contact", contactRouter);

app.use("/api/v1/administrators", administratorRouter);

// error handler======
app.use(error_handler.routeNotFound);

app.use(error_handler.globalErrorHandler);

// app listener
app.listen(process.env.port, () => {
  console.log(
    colors.magenta(`Example app listening on port ${process.env.port}`.magenta)
  );
});
