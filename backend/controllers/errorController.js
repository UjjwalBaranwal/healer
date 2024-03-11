const AppError = require("../utils/appError");
const handleCastErrorDB = (err) => {
  const msg = `Invalid ${err.path}:${err.value}.`;
  return new AppError(msg, 400);
};
const handleDuplicateNameErrorDB = (err) => {
  console.log(err);
  const key = Object.keys(err.keyValue).join("");
  const msg = `The key '${key}' has duplicate value of '${err.keyValue[key]}'`;
  return new AppError(msg, 400);
};
const handleValidationErrorDB = (err) => {
  const errors = Object.values(err).map((el) => el.message);
  const msg = `invalid entered data ${errors.join(". ")}`;
  return new AppError(msg, 400);
};

const handleErrorJWT = () => {
  return new AppError("invalid token, plx log in again ", 401);
};

const handleTokenExpireError = () => {
  return new AppError("your token is Expired . please log in again", 401);
};

const sendErrorDev = (res, err) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
    error: err,
  });
};

const sendErrorProd = (res, err) => {
  // operational error ... trusted error send message to client
  if (err.isOperational) {
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message,
    });
  }
  // programming or any unknown message
  else {
    // 1) log the error
    console.error("ERROR 💣", err);
    //2)send the generic message
    res.status(500).json({
      status: "error",
      message: "something went wrong",
    });
  }
};

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.status = err.status || "error";
  if (process.env.NODE_ENV === "development") {
    sendErrorDev(res, err);
  } else {
    /// creatign error handler for the error come from the database itself
    let error = { ...err }; //created a hard copy of the err
    //1) invalid id --- casterror
    if (error.name === "CastError") error = handleCastErrorDB(error);
    //2) duplicate name --- error.code=11000 (see in the log)
    if (error.code == 11000) error = handleDuplicateNameErrorDB(error);
    //3) validation error errr.name==='ValidationError
    if (error._message === "Validation failed")
      error = handleValidationErrorDB(error);
    if (error.name === "JsonWebTokenError") error = handleErrorJWT();
    if (error.name === "TokenExpiredError") error = handleTokenExpireError();
    /// production env
    sendErrorProd(res, error);
  }
};
