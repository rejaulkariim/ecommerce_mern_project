const express = require("express");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const app = express();

// Middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const isLoggedIn = (req, res, next) => {
  const login = true;

  if (login) {
    req.body.id = 101;
    next();
  } else {
    return res.status(401).json({ message: "unauthorized user" });
  }
  console.log("middleware is working");
};

app.get("/", (req, res) => {
  res.status(200).send({
    message: "welcome to the server",
  });
});

app.get("/api/users", isLoggedIn, (req, res) => {
  console.log(req.body.id);
  res.status(200).send({
    message: "user profile is returned",
  });
});

// client error handling
app.use((req, res, next) => {
  res.status(404).json({ message: "route not found" });
  next();
});

// server error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

// Start the server and listen on port 5000
app.listen(5000, () => {
  console.log("server is rinning on port http://localhost:5000");
});
