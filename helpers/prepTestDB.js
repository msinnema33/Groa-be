const db = require("../database/dbConfig.js");

module.exports = function() {
  return db.migrate
    .rollback()
    .then(() => db.migrate.latest())
    .then(() => db.seed.run());
};
