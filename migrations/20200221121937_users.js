exports.up = function(knex) {
    return knex.schema
    .createTable('users', tbl => {
        tbl.increments();
        tbl.string('name');
        tbl.string('username', 50)
            .notNullable()
            .unique();
        tbl.string('password', 100)
            .notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('users')
};
