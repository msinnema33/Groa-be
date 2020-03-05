const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("../auth/users/users-router.js");
const uploadingRouter = require("../uploading/uploading-router.js");

const server = express();

server.use(helmet());
server.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "groa.us"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
server.options('*', cors());
server.use(cors());
server.use(express.json());

server.use("/docs", express.static("./docs"));
server.use("/api/users", userRouter, uploadingRouter);

server.get("/", (req, res) => {
  res.status(200).json("Welcome to the Backend of Groa");
});

module.exports = server;
