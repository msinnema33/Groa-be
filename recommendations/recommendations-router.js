const express = require("express");
const axios = require("axios");
const { authToken } = require("../auth/authenticate-middleware");
const router = express.Router();

const Recommendations = require("./recommendations-model");

// NEW RECOMMENDATIONS REQUEST
router.get("/:id/recommendations", (req, res) => {
    const { id } = req.params;
    console.log(`user_id: "${id}"`)
    axios.post(
    process.env.RECOMMENDER_URL, 
    {
      "user_id": id,
      "number_of_recommendations": 50,
      "good_threshold": 5,
      "bad_threshold": 4,
      "harshness": 1
    }, 
    {headers: {"Content-Type":"application/json"}}
    )
    .then(response => {
      console.log(response.data)
      if(response.data === "user_id not found" || response.data === "user_id not found in IMDB ratings or Letterboxd ratings"){
        res.status(404).json({ message: `Recommendations not available at this time, try adding your Letterboxd data. Received: ${response.data}` })
      }
      Recommendations.getLatestRecommendations(id)
      .then(recommendations => {
        console.log(recommendations)
        if (recommendations) {
          res.status(200).json(recommendations)
        }
      })
    }) 
    .catch(error => {
      console.log(error)
      res.status(500).json({ error, errorMessage: "Could not retrieve any recommendations for your account."});
    });
  });
  
  // LATEST RECOMMENDED REQUEST
  router.get("/:id/recommended", (req, res) => {
    const { id } = req.params;
    console.log(id)
    Recommendations.getLatestRecommendations(id)
    .then(recommendations => {
      console.log(recommendations)
      if (recommendations) {
        res.status(200).json(recommendations)
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error, errorMessage: "Could not retrieve any recommendations for your account, try uploading a file."});
    });
  });

  // GET ALL PAST RECOMMENDATIONS
  router.get("/:id/recommendation-history", (req, res) => {
    const { id } = req.params;
    console.log(`user_id: "${id}"`)

    Recommendations.getAllRecommendations(id)
    .then(recommendations => {
      console.log(recommendations)
      if (recommendations) {
        res.status(200).json(recommendations)
      }
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ error, errorMessage: "Could not retrieve any recommendations for your account, try uploading a file."});
    });
  });

  module.exports = router;