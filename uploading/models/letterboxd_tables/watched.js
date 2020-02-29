const db = require("../../../database/dbConfig.js");

module.exports = { addToWatched };

async function addToWatched(movie) {
  const [id] = await db("user_letterboxd_watched").insert(movie, "id");
  return db("user_letterboxd_watched")
    .where({ id })
    .first();
}
