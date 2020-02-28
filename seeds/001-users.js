const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex("users")
    .del()
    .then(function() {
      // Inserts seed entries
      return knex("users").insert([
        {
          user_name: "blubsbunny",
          password: `${bcrypt.hashSync("Password1234!", 10)}`,
          email: "blubsbunny@gmail.com"
        },
        {
          user_name: "moviedatascience",
          password: `${bcrypt.hashSync("Password1234!", 10)}`,
          email: "moviedatascience@gmail.com"
        },
        {
          user_name: "gustydad",
          password: `${bcrypt.hashSync("Password1234!", 10)}`,
          email: "gustydad@gmail.com"
        }
      ]);
    });
};
