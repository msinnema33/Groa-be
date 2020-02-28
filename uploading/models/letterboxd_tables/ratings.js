const db = require("../../../database/dbConfig.js");

module.exports = { addRating };

async function addRating(rating) {
  let rated = await db("user_letterboxd_ratings").insert(rating);
  console.log("RATED: ", rated);
  return db("user_letterboxd_ratings")
    .where({ name: rating.name })
    .first();
}
