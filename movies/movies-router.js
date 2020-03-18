const express = require("express");
const router = express.Router();

const Movies = require("./movies-model");


router.get("/movies", (req, res) => {
  const {searchTerm} = req.body
   Movies.findMovie(searchTerm)
      .then(movies => {
        res.status(200).json(movies);
    })
    .catch(err => {
        console.log(err)
        res.status(500).json(err);
    })
})

module.exports = router;