const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("../auth/users/users-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/docs", express.static("./docs"));
server.use("/api/users", userRouter);

// uploadingRouter will be a child route of users
const UploadingRouter = express.Router({ mergeParams: true });
// creating middleware for UploadingRouter to use the userid parameter
server.use("/:userid/uploading", UploadingRouter);

server.get("/", (req, res) => {
  res.status(200).json("Welcome to the Backend of Groa");
});

module.exports = server;
