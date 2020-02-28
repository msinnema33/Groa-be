const db = require("../../../database/dbConfig.js");

module.exports = { addToWatched };

async function addToWatched(movie) {
   return db("user_letterboxd_watched").insert(movie);
}
