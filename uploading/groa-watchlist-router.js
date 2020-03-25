const router = require("express").Router();

// model functions
const {
  addToWatchList,
  getWatchlist
} = require("./models/user_groa_tables/watch_list.js");

/**
 * @api {post} /users/:user_id/add-movie-rating
 * @apiName Rate a Movie
 * @apiGroup Movies
 *
 * @apiParam {string} name **Required** | Title of the movie you want to rate.
 * @apiParam {integer} year **Required** | The year the movie was made.
 * @apiParam {float} rating **Required** | The rating, can be 0 - 5 and accepts 3.5
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 *  {
 *    rated: {
 *      id: INTEGER
 *      date: DATE TIMESTAMP
 *      name: STRING
 *      year: INTEGER
 *      rating: INTEGER FLOAT
 *      user_id: INTEGER
 *     }
 *  }
 *
 * @apiError MissingBodyReqs The <code>req.body.param</code> was not found.
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 400
 *  {
 *    message: "Please send a movie name with this request."
 *  }
 *
 */
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
