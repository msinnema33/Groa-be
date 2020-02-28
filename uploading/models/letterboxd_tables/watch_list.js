const db = require("../../../database/dbConfig.js");

module.exports = { addToWatchList };

async function addToWatchList(movie) {
  const [id] = await db("user_letterboxd_watchlist").insert(movie, "id");
  return db("user_letterboxd_watchlist")
    .where({ id })
    .first();
}
