const db = require("../../../database/dbConfig.js");

module.exports = { addToWatchList };

async function addToWatchList(movie) {
  const [id] = await db("user_letterboxd_watchlist")
  .select('*')
  .where("letterboxd_uri", movie.letterboxd_uri, 'and', "user_id", movie.user_id)
  .then(watchlist => {
    if(watchlist.length === 0) {
      return db("user_letterboxd_watchlist")
  .insert(movie, "id");
    }
  }); 
  return db("user_letterboxd_watchlist")
    .where({ id })
    .first();
};
