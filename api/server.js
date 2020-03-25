const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const userRouter = require("../auth/users/users-router.js");
const uploadingRouter = require("../uploading/uploading-router.js");
const movieRouter = require("../movies/movies-router");
const recommendationsRouter = require("../recommendations/recommendations-router.js");
const groaUserRouter = require("../uploading/groa-user-router.js");

const server = express();

server.use(helmet());
server.use(
  cors({
    origin: "*"
  })
);
server.use(express.json());

server.use("/docs", express.static("./docs"));
server.use(
  "/api/users",
  userRouter,
  uploadingRouter,
  recommendationsRouter,
  groaUserRouter,
  movieRouter
);

server.get("/", (req, res) => {
  res.status(200).json("Welcome to the Backend of Groa");
});

module.exports = server;
