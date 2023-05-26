const app = require("./app");
const { serverPort } = require("./secret");

// Start the server and listen on port 5000
app.listen(serverPort, () => {
  console.log(`server is rinning on port http://localhost:${serverPort}`);
});
