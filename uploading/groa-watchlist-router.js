const router = require("express").Router();

// model functions
const {
  addToWatchList,
  getWatchlist
} = require("./models/user_groa_tables/watch_list.js");

router.post("/:user_id/add-to-watchlist", (req, res) => {
  const movie = {
    date: new Date(),
    name: req.body.name,
    year: Number(req.body.year),
    user_id: Number(req.params.user_id)
  };
  addToWatchList(movie)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(err =>
      res.status(500).json({
        message:
          "Sorry. Something went wrong while trying to add this movie to your watch list.",
        error: err,
        error_message: err.message
      })
    );
});

router.get("/:user_id/get-watchlist", (req, res) => {
  getWatchlist(req.params.user_id)
    .then(watchlist => res.status(200).json(watchlist))
    .catch(err =>
      res.status(500).json({
        message: "Something went wrong in gettings ratings.",
        error: err,
        errorMessage: err.message
      })
    );
});

module.exports = router;
