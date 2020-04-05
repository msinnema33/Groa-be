const db = require("../database/dbConfig.js");

module.exports = {
    getAllMovies
}

function getAllMovies(user_id) {
    return db("imdb_movies as im")
    .where("title_type", "movie")
    .select(
        "im.movie_id as imdb_id",
        "im.primary_title as name",
        "im.start_year as year",
        "im.runtime_minutes",
        "im.genres",
        "im.poster_url",
        "im.average_rating",
        "im.num_votes",
        "im.release_date",
        "im.original_language",
    )
    .whereNotNull("im.average_rating")
    .whereNotNull("im.poster_url")
    .whereNotNull("im.num_votes")
    .orderBy("im.num_votes", "desc")
}