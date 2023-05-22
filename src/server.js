const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.status(200).send({
    message: "welcome to the server",
  });
});

// Start the server and listen on port 5000
app.listen(5000, () => {
  console.log("server is rinning on port http://localhost:5000");
});
