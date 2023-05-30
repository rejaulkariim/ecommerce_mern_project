const app = require("./app");
const connectDatabase = require("./config/db");
const { serverPort } = require("./secret");

// Start the server and listen on port 5000
app.listen(serverPort, async() => {
  console.log(`server is rinning on port http://localhost:${serverPort}`);
  await connectDatabase();
});
