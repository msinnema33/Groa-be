const db = require("../../../database/dbConfig.js");

module.exports = { 
  addRating,
  getRatingById
  // getRatings
 };

async function addRating(rating) {
  await db("user_letterboxd_ratings")
  .select('*')
  .where("letterboxd_uri", rating.letterboxd_uri)
  .andWhere("user_id", rating.user_id)
  .then(ratings => {
    if(ratings.length === 0) {
      console.log("ADDING RATING:", rating.name)
      return db("user_letterboxd_ratings")
      .insert(rating, "id")
      .then(ids => {
        const [id] = ids;
        return db("user_letterboxd_ratings")
          .where({ id })
          .first();
      })
    } else{
      console.log("UPDATING RATING:", rating.name)
      return db("user_letterboxd_ratings")
      .where("letterboxd_uri", rating.letterboxd_uri)
      .andWhere("user_id", rating.user_id)
      .update("rating", rating.rating, "id")
      .then(ids => {
        const [id] = ids;
        return db("user_letterboxd_ratings")
          .where({ id })
          .first();
      })
    }
  }) 
};

function getRatingById(id) {
  return db("user_letterboxd_ratings")
    .where("id", id )
    .first();
};