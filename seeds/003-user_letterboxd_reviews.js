
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('user_letterboxd_reviews').del()
    .then(function () {
      // Inserts seed entries
      return knex('user_letterboxd_reviews').insert([
        {
          date: new Date("2012-09-20" + "Z"),
          name: "Reservoir Dogs",
          year: 1992,
          rating: 3.5,
          user_id: 3,
          letterboxd_uri: "https://letterboxd.com/tabula_rasta/film/reservoir-dogs/",
          rewatch: "",
          review:
            "No film before or since has embraced nihilism so willingly and made you enjoy it so much (hopefully, to some shame.) I'm not convinced there is any point to this movie but to be a movie, and that job it does quite well and provides a little context to Tarantino's later films.",
          tags: "",
          watched_date: ""
        },
        {

          date: new Date("2012-09-20" + "Z"),
          name: "Singin' in the Rain",
          year: 1952,
          rating: 3.5,
          letterboxd_uri: "https://letterboxd.com/tabula_rasta/film/singin-in-the-rain/",
          rewatch: "",
          review:
            "The best of comedy, joy and wonder, distilled to perfection. It took me half an hour to wipe the smile off my face; this is a must-see classic.",
          tags: "",
          watched_date: "",
          user_id: 3
        },
      ]);
    });
};