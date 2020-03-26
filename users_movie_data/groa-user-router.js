const router = require("express").Router();

// model functions
const {
  addRating,
  getRatings
} = require("./models/user_groa_tables/ratings.js");

// middleware
const validateRatingBody = require("./middleware/validateRatingBody.js");

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
router.post("/:user_id/add-movie-rating", validateRatingBody, (req, res) => {
  const newRating = {
    date: new Date(),
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

/**
 * @api {get} /users/:user_id/get-ratings
 * @apiName Get Movie Ratings
 * @apiGroup Movies
 *
 * @apiSuccessExample Success-Response:
 *  HTTP/1.1 201 Created
 * [
 *   {
 *     "id": 3999,
 *     "date": "2020-03-17T05:00:00.000Z",
 *     "name": "Lilo & Stitch",
 *     "year": 2002,
 *     "rating": 5,
 *     "poster_url": "/tVaEulzowKhMhDvHNNYb9rNEZPB.jpg"
 *   },
 *   {
 *     "id": 6117,
 *     "date": "2020-03-24T05:00:00.000Z",
 *     "name": "Some Like It Hot",
 *     "year": 1959,
 *     "rating": 3,
 *     "poster_url": "/pxc9EFCMYkItESpqqrI783yl8Gh.jpg"
 *   },
 *   {
 *     "id": 3998,
 *     "date": "2020-03-17T05:00:00.000Z",
 *     "name": "Ice Age",
 *     "year": 2002,
 *     "rating": 3.5,
 *     "poster_url": "/zpaQwR0YViPd83bx1e559QyZ35i.jpg"
 *   }
 * ]
 *
 * @apiError MissingBodyReqs The <code>req.body.param</code> was not found.
 * @apiErrorExample {json} Error-Response:
 *  HTTP/1.1 400
 *  {
 *    message: "Please send a movie name with this request."
 *  }
 *
 */
router.get("/:user_id/get-ratings", (req, res) => {
  getRatings(req.params.user_id)
    .then(ratings => res.status(200).json(ratings))
    .catch(err =>
      res.status(500).json({
        message: "Something went wrong in gettings ratings.",
        error: err,
        errorMessage: err.message
      })
    );
});

module.exports = router;
