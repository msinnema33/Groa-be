const db = require("../../database/dbConfig.js");

module.exports = {
  add,
  findBy,
  getUserById,
  getUserRecommendations
};

function add(user) {
  return db("users")
    .insert(user, "id")
    .then(ids => {
      const [id] = ids;
      return db("users")
        .where({ id })
        .first();
    });
}

function findBy(user_name) {
  return db("users")
    .where("user_name", user_name)
    .first();
}

function getUserById(id) {
  return db("users")
    .where({ id })
    .first();
}

function getUserRecommendations(id) {
  return db("recommendations as r")
    .select(
      "r.user_id",
      "r.recommendation_id",
      "r.recommendation_json",
      "u.user_name",
    )
    .join("users as u", "r.user_id", "=", "u.id")
    .where("r.user_id", id);
}
