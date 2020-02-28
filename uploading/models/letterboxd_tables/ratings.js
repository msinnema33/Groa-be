const db = require("../../../database/dbConfig.js");

module.exports = { addRating };

async function addRating(rating) {
  console.log("RATING: ", rating);
  let rated = await db("user_letterboxd_ratings").insert(rating);
  return rated;
}
