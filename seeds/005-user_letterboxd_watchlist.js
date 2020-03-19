const { truncateTable } = require("../helpers/prepTestDB");

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return truncateTable('user_letterboxd_watchlist')
    .then(function () {
      // Inserts seed entries
      return knex('user_letterboxd_watchlist').insert([
        {
          date: new Date("2012-09-20" + "Z"),
          name: "Shame",
          year: 2011,
          letterboxd_uri: "https://letterboxd.com/film/shame-2011/",
          user_id: 3
        },
        {
          date: new Date("2012-09-20" + "Z"),
          name: "Moneyball",
          year: 2011,
          letterboxd_uri: "https://letterboxd.com/film/moneyball/",
          user_id: 3
        }
      ]);
    });
};
