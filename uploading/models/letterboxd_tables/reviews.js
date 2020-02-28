const db = require("../../../database/dbConfig.js");

module.exports = { addReview };

async function addReview(review) {
  return db("user_letterboxd_reviews").insert(review);
}
