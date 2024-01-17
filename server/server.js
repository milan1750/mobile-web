// Express Js
const express = require("express");
const app = express();

// Enable Cors
const cors = require("cors");

// Get Environment Vriables from ENV file
require("dotenv").config({ path: "./config.env" });

// Server Port
const port = process.env.PORT || 5001;

app.use(cors());
app.use(express.json());

// User management apis
app.use(require("./routes/user"));

// Get MongoDb
const myDb = require("./conn/db");

app.listen(port, () => {
  // perform a database connection when server starts
  myDb.connectToServer(function (err) {
    if (err) console.error(err);
   });
  console.log(`Server is running on port: ${port}`);
});
