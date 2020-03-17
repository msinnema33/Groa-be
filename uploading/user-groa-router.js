const router = require("express").Router();

// model functions
const { addRating } = require("./models/user_groa_tables/ratings.js");

/**
 * @api {post} users/:user_id/add-movie-rating Rate a movie
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
 *    message: "Success"
 *  }
 *
 * @apiError {object} message, error, error message
 *
 * @apiErrorExample Error-Response:
 *  HTTP/1.1 500
 *
 * {
 *   "message": "Sorry. Something went wrong while trying to add this rating.",
 *   "error": {
 *     "name": "error",
 *     "length": 92,
 *     "severity": "ERROR",
 *     "code": "22P02"
 *   },
 *   "error_message": ""
 *  }
 */
router.post("/:user_id/add-movie-rating", (req, res) => {
  let newRatingDate = new Date();
  const newRating = {
    date: newRatingDate, // has to be UTC
    name: req.body.name,
    year: Number(req.body.year),
    rating: req.body.rating * 1,
    user_id: Number(req.params.user_id)
  };

  addRating(newRating)
    .then(rated => {
      res.status(201).json(rated);
    })
    .catch(err =>
      res.status(500).json({
        message: "Sorry. Something went wrong while trying to add this rating.",
        error: err,
        error_message: err.message
      })
    );
});

module.exports = router;
