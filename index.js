require("dotenv").config();
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const connectToDatabase = require("./database");
const loginRoutes = require("./router/route");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

app.use(express.json())

app.get("/", (req, res) => {
  res.json("quiz backend is Running");
});

connectToDatabase.then(() => {
  //health check routes
  app.get("/", (req, res) => {
    res.json("quiz backend is Running");
  });

  app.use("/api/", loginRoutes);

  //error handler
  app.use(function (err, req, res, next) {
    res.status(500);
    res.send({
      message: "something went wrong",
      error: err?.message || err,
      code: err.code,
    });
  });

  app.listen(5000, () => {
    console.log(`Server is running at port 5000`);
  });
});

module.exports = app;
