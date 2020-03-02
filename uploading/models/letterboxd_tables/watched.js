const db = require("../../../database/dbConfig.js");

module.exports = { addToWatched };

async function addToWatched(movie) {
  const [id] = await db("user_letterboxd_watched")
  .select('*')
  .where("letterboxd_uri", movie.letterboxd_uri)
  .andWhere("user_id", movie.user_id)
  .then(watched => {
    if(watched.length === 0) {
      return db("user_letterboxd_watched")
      .insert(movie, "id");
    }
}) 
  return db("user_letterboxd_watched")
    .where({ id })
    .first();
}
