const db = require("../../../database/dbConfig.js");

module.exports = { 
  addReview,
  getReviewById
};

async function addReview(review) {
  await db("user_letterboxd_reviews")
  .select('*')
  .where("letterboxd_uri", review.letterboxd_uri)
  .andWhere("user_id", review.user_id)
  .then(reviews => {
    if(reviews.length === 0) {
      return db("user_letterboxd_reviews")
      .insert(review, "id")
    } else {
      return db("user_letterboxd_reviews")
      .where("letterboxd_uri", review.letterboxd_uri)
      .andWhere("user_id", review.user_id)
      .update("review", review.review, "id")
    }
  })
}

function getReviewById(id) {
  return db("user_letterboxd_reviews")
    .where("id", id )
    .first();
};