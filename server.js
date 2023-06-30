const express = require("express");
const path = require("path");
const app = express();

// Serve static files from the "build" directory
app.use(express.static(path.join(__dirname, "build")));

// Serve the index.html file for all requests
app.get("/", function (req, res) {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

// Start the server
app.listen(9000, function () {
  console.log("App is running on port 9000");
});
