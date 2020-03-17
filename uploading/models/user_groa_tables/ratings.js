const db = require("../../../database/dbConfig.js");

module.exports = {
  addRating,
  getRatingById
};

/**
 * Inserts a rating to the database for the Groa site
 * @param {object} rating - date, name, year, rating, user_id
 * @returns {ratedMovie}
 */
async function addRating(rating) {
  await db("user_groa_ratings").insert(rating);
  return { message: "Success!" };
}

/**
 * Returns a movie ratings by id
 * @param {number} id user_groa_ratings id
 * @returns {ratedMovie}
 */
function getRatingById(id) {
  return db("user_groa_ratings")
    .where("id", id)
    .first();
}
