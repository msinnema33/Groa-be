
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_letterboxd_watched').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_letterboxd_watched').insert([
        {
          date: new Date("2012-09-20" + "Z"),
          name: "Pulp Fiction",
          year: 1994,
          letterboxd_uri: "https://letterboxd.com/film/pulp-fiction/",
          user_id: 3
        },
        {
          date: new Date("2012-09-20" + "Z"),
          name: "The Dark Knight Rises",
          year: 2012,
          letterboxd_uri: "https://letterboxd.com/film/the-dark-knight-rises/",
          user_id: 3
        },
      ]);
    });
};