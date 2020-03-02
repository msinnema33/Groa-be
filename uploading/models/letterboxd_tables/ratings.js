const db = require("../../../database/dbConfig.js");

module.exports = { addRating };

async function addRating(rating) {
  let [id] = await db("user_letterboxd_ratings")
  .select('*')
  .where("letterboxd_uri", rating.letterboxd_uri)
  .andWhere("user_id", rating.user_id)
  .then(ratings => {
    if(ratings.length === 0) {
      return db("user_letterboxd_ratings")
      .insert(rating, "id")
    } else{
      return db("user_letterboxd_ratings")
      .where("letterboxd_uri", rating.letterboxd_uri)
      .andWhere("user_id", rating.user_id)
      .update("rating", rating.rating)
    }
  }) 
  return db("user_letterboxd_ratings")
  .where({ id })
  .first();
}