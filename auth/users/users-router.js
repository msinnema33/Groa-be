const bcrypt = require("bcryptjs");
const express = require("express");
const jwt = require("jsonwebtoken");
const axios = require("axios");
const { signToken, authToken } = require("../authenticate-middleware.js");
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

// router.get("/login/google", passport.authenticate("google", {
//     scope: ['profile']
// }));

// router.get("/login/google/redirect", passport.authenticate("google"), (req, res) => {
//     const token = generateToken(req.user);

//     res.redirect(`localhost:5000/callback?jwt=${token}&user=${JSON.stringify(req.user)}`);

// })

// GET specific User's recommendations /api/users/:id/recommendations
router.get("/:id/recommendations",  (req, res) => {
  const { id } = req.params;

 Users.getUserRecommendations(id)
    .then(recommendations => {
      if (recommendations.recommendation_json && recommendations.recommendation_json.length > 0) {
        res.status(200).json(recommendations);
      } else {  
        axios.post("http://a019b0a6e5ca111eaa5e61268ccf1425-1710733059.us-east-1.elb.amazonaws.com/movie-recommender", id, {headers: {"Content-Type":"application/json"}})
        .then(response => {
          res.status(200).json(response.data)
        })
        .finally( 
          Users.getUserRecommendations(id)
          .then(recommendations => {
            res.status(200).json(recommendations)
          })
        )
        .catch(error => {
          res.status(404).json({ error, message: "Recommendations not available at this time, try adding your Letterboxd data."})
        })
      }
    })
    .catch(error => {
      res.status(500).json({ error, errorMessage: "Could not retrieve any recommendations for your account."});
    });
});

module.exports = router;
