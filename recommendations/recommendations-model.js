const db = require("../database/dbConfig.js");

module.exports = {
  getLatestRecommendations,
  getAllRecommendations,
};

function getLatestRecommendations(id) {
  return db("recommendations as r")
    .select(
      "r.recommendation_json",
    )
    .where("r.user_id", id)
    .orderBy("r.date", "desc")
    .first();
}
  
function getAllRecommendations(id) {
  return db("recommendations as r")
    .select("*")
    .where("r.user_id", id)
    .orderBy("r.date", "desc")
}
