const express = require("express");
const router = express.Router();

const Movies = require("./movies-model");


router.post("/movies", (req, res) => {
  const {search, submit, genres, year} = req.body
   Movies.findMovie(search, submit, genres, year)
      .then(movies => {
        res.status(200).json(movies);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

module.exports = router;