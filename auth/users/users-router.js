const bcrypt = require("bcryptjs");
const express = require("express");
const { signToken } = require("../authenticate-middleware.js");
const router = express.Router();

const Users = require("./users-model");

// REGISTER
router.post("/register", (req, res) => {
  let userData = req.body;
  const hash = bcrypt.hashSync(userData.password, 8);
  userData.password = hash;
  Users.findBy( userData.user_name )
  .then(user => {
    if(!user) {
      Users.add(userData)
      .then(user => {
          res.status(200).json({
            message: `Registration successful ${user.user_name}!`,
            id: user.id
          });
      })
    } else {
      res.status(400).json({ errorMessage: "Username already in use!" });
    }
  })
    .catch(error => {
      res.status(500).json({ errorMessage: "Failed to register new user" });
    });
});

// LOGIN
router.post("/login", (req, res) => {
  let { user_name, password } = req.body;
  Users.findBy( user_name )
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200).json({
          message: `${user.user_name} Logged In!`,
          token,
          id: user.id
        });
      } else {
        res.status(401).json({ message: "Failed to login" });
      }
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Failed to retrieve credentials " });
    });
});

module.exports = router;