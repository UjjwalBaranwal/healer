const path = require("path");
const morgan = require("morgan");
const express = require("express");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const globalErrorHandler = require("./controllers/errorController");
const AppError = require("./utils/appError");
const app = express();
//security middleware
app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.json({ limit: "10kb" })); //middleWare
app.use(cookieParser());

//////////////////////////////////////////////////////////////////////
/////////// Creating our own middleWare function
app.use((req, res, next) => {
  console.log("hello from the middleware 😎");
  // console.log(req.cookies);
  next();
});

app.use((req, res, next) => {
  req.requestTime = new Date().toISOString();
  next();
});
//////////////////////////////////////////////////////////////////////

app.all("*", (req, res, next) => {
  next(new AppError(`can't find the ${req.originalUrl}`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
