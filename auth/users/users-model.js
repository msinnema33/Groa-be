const db = require("../../database/dbConfig.js");

module.exports = {
  add,
  findBy,
  getUserById,
  findUsers,
  getUserData
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

async function getUserData(id) {
  let user = await getUserById(id)
  .select("id as user_id", "user_name")
  await db("user_groa_ratings")
  .where("user_id", id)
  .then(ratings => {
    user = {
      ...user, ratings
    }
  })
  await db("user_groa_reviews")
  .where("user_id", id)
  .then(reviews => {
    user = {
      ...user, reviews
    }
  })
  await db("user_letterboxd_watched")
  .where("user_id", id)
  .then(watched => {
    user = {
      ...user, watched
    }
  })
  await db("user_groa_watchlist")
  .where("user_id", id)
  .then(watchlist => {
    user = {
      ...user, watchlist
    }
  })
  return user;
};