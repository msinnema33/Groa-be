const db = require("../../../database/dbConfig.js");

module.exports = { 
  addToWatched,
  getWatchedById
 };

async function addToWatched(movie) {
  await db("user_letterboxd_watched")
  .select('*')
  .where("letterboxd_uri", movie.letterboxd_uri)
  .andWhere("user_id", movie.user_id)
  .then(watched => {
    if(watched.length === 0) {
      console.log("ADDING WATCHED MOVIES", movie.name)
      return db("user_letterboxd_watched")
      .insert(movie, "id")
    }
  }) 
}

function getWatchedById(id) {
  return db("user_letterboxd_watched")
    .where("id", id )
    .first();
};