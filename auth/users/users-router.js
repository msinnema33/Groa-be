const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const authenticate = require("../authenticate-middleware.js");
const router = express.Router();

const Users = require("./users-model");

// REGISTER/LOGIN
router.post("/register", (req, res) => {
  let userData = req.body;
  const hash = bcrypt.hashSync(userData.password, 8);
  userData.password = hash;
  console.log(userData);
  Users.add(userData)
    .then(user => {
      res.status(201).json(user);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({ errorMessage: "Failed to register new user " });
    });
});

router.post("/login", (req, res) => {
  let { username, password } = req.body;
  Users.findBy({ username })
    .then(user => {
      if (user && bcrypt.compareSync(password, user.password)) {
        const token = signToken(user);
        res.status(200).json({
          message: `${user.username} Logged In!`,
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

// router.get("/login/google", passport.authenticate("google", {
//     scope: ['profile']
// }));

// router.get("/login/google/redirect", passport.authenticate("google"), (req, res) => {
//     const token = generateToken(req.user);

//     res.redirect(`localhost:5000/callback?jwt=${token}&user=${JSON.stringify(req.user)}`);

// })

// GET specific User's recommendations /api/users/:id/recommendations
router.get("/:id/recommendations", authenticate, (req, res) => {
  const { id } = req.params;

  Users.getUserRecommendations(id)
    .then(recommendations => {
      if (recommendations) {
        res.json(recommendations);
      } else {
        res
          .status(404)
          .json({ error: "Could not find recommendations with provided ID" });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

// ---------- Function for creating and signing token ----------- //

function signToken(user) {
  const payload = {
    username: user.username
  };

  const secret = process.env.JWT_SECRET || "secret code";

  const options = {
    expiresIn: "8h"
  };

  return jwt.sign(payload, secret, options);
}

module.exports = router;
