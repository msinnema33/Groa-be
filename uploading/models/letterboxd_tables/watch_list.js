const db = require("../../../database/dbConfig.js");

module.exports = { addToWatchList };

async function addToWatchList(movie) {
   return db("user_letterboxd_watchlist").insert(movie);
}
