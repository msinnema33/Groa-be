const db = require("../../../database/dbConfig.js");

module.exports = { addReview };

async function addReview(review) {
  const [id] = await db("user_letterboxd_reviews").insert(review, "id");
  return db("user_letterboxd_reviews")
    .where({ id })
    .first();
}
