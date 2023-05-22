const express = require("express");
const morgan = require("morgan")
const app = express();

// Middlewares
app.use(morgan("dev"))

app.get("/", (req, res) => {
  res.status(200).send({
    message: "welcome to the server",
  });
});

// Start the server and listen on port 5000
app.listen(5000, () => {
  console.log("server is rinning on port http://localhost:5000");
});
