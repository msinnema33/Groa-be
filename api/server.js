const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("../auth/users/users-router.js");
const uploadingRouter = require("../uploading/uploading-router.js");

const server = express();

server.use(helmet());
server.use(cors({
  origin: '*'
  // origin: "https://uploading-cors-fix.d1ms51d9oybzjy.amplifyapp.com",
}));
server.use(express.json());

server.use("/docs", express.static("./docs"));
server.use("/api/users", userRouter, uploadingRouter);

server.get("/", (req, res) => {
  res.status(200).json("Welcome to the Backend of Groa");
});

module.exports = server;
