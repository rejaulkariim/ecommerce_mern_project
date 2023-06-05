const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const xssClean = require("xss-clean");
const rateLimit = require("express-rate-limit");
const userRouter = require("./routers/userRouter");
const seedRouter = require("./routers/seedRouter");

const app = express();

const rateLimiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 5,
  message: "Too many request from this IP, please try again later",
});

// Middlewares
app.use(rateLimiter);
app.use(xssClean());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// user router
app.use("/api/users", userRouter);
app.use("/api/seed", seedRouter);

app.get("/test", (req, res) => {
  res.status(200).send({
    message: "welcome to the server",
  });
});

// client error handling
app.use((req, res, next) => {
  next(createError(404, "route not found"));
});

// server error handling -> all the error
app.use((err, req, res, next) => {
  return res.status(err.status || 500).json({
    success: false,
    message: err.message,
  });

  return errorResponse(res, { statusCode: err.status, message: err.message });
});

module.exports = app;
