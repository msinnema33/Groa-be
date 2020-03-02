const db = require("../../../database/dbConfig.js");

module.exports = { addReview };

async function addReview(review) {
  const [id] = await db("user_letterboxd_reviews")
  .select('*')
  .where("letterboxd_uri", review.letterboxd_uri)
  .andWhere("user_id", review.user_id)
  .then(ratings => {
    if(ratings.length === 0) {
      return db("user_letterboxd_reviews")
      .insert(review, "id");
    } else {
      return db("user_letterboxd_reviews")
      .where("letterboxd_uri", review.letterboxd_uri)
      .andWhere("user_id", review.user_id)
      .update("review", review.review)
    }
  })
  return db("user_letterboxd_reviews")
    .where({ id })
    .first();
}
