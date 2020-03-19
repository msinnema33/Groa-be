const { truncateTable } = require("../helpers/prepTestDB");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return truncateTable('user_letterboxd_ratings')
    .then(function () {
      // Inserts seed entries
      return knex('user_letterboxd_ratings').insert([
        {
          date: new Date("2020-02-14" + "Z"),
          name: "Aladdin",
          year: 1992,
          letterboxd_uri: "https://letterboxd.com/film/aladdin/",
          rating: 4,
          user_id: 3
        },
        {
          date: new Date("2020-02-14" + "Z"),
          name: "The Princess Bride",
          year: 1987,
          letterboxd_uri: "https://letterboxd.com/film/the-princess-bride/",
          rating: 3.5,
          user_id: 3
        },
      ]);
    });
};
