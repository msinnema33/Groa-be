exports.up = function(knex) {
  return knex.schema.createTable("user_letterboxd_ratings", tbl => {
    tbl.increments();
    tbl.date("date");
    tbl.string("name");
    tbl.integer("year");
    tbl.decimal("rating", 2, 1);
    tbl
      .integer("user_id")
      .unsigned()
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("CASCADE")
      .onUpdate("CASCADE");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("user_letterboxd_ratings");
};
