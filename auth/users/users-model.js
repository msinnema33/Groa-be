const db = require("../../database/dbConfig.js");

module.exports = {
  add,
  findBy,
  getUserById,
  findUsers,
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

function findUsers() {
  return db("users")
    .select("user_name", "id")
}

function getUserRecommendations(id) {
  return db("recommendations as r")
    .select(
      "r.recommendation_json",
    )
    .where("r.user_id", id)
    .first();
}