const db = require("../../../database/dbConfig.js");

module.exports = {
  addToWatchList,
  getWatchlist,
  getListItemById,
  removeMovieFromWatchList
};

async function addToWatchList(movie) {
  await db("user_groa_watchlist")
    .select("*")
    .where("name", movie.name)
    .andWhere("year", movie.year)
    .andWhere("user_id", movie.user_id)
    .then(watchlist => {
      if (watchlist.length === 0) {
        return db("user_groa_watchlist").insert(movie, "id");
      }
    });
}

/**
 * Returns an array of movie to watch by user_id with their posters
 * @param {number} user_id - user_groa_watchlist user_id
 * @returns [{movie},{movie},...]
 */
function getWatchlist(user_id) {
  return db("user_groa_watchlist as wl")
    .innerJoin("imdb_movies", {"imdb_movies.primary_title": "wl.name", "imdb_movies.start_year":"wl.year"})
    .select(
      "wl.id",
      "wl.date",
      "wl.name",
      "wl.year",
      "wl.user_id",
      "imdb_movies.poster_url"
    )
    .where("wl.user_id", user_id);
}

function getListItemById(id) {
  return db("user_groa_watchlist")
    .where("id", id)
    .first();
}

function removeMovieFromWatchList(id) {
  return getListItemById(id).then(() => {
    return db("user_groa_watchlist")
      .where({ id })
      .del()
      .then(() => "Success")
      .catch(err => err);
  });
}
