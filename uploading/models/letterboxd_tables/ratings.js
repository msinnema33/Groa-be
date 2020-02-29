const db = require("../../../database/dbConfig.js");

module.exports = { addRating };

async function addRating(rating) {
  let [id] = await db("user_letterboxd_ratings").insert(rating, "id");
  return db("user_letterboxd_ratings")
    .where({ id })
    .first();
}