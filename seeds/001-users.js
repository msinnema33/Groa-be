
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {id: 1, name: 'Jim Smith', username: 'user1', password: 'user1test123'},
        {id: 2, name: 'Sara Jones', username: 'user2', password: 'user2test123'},
        {id: 3, name: 'Kelly Johnson', username: 'user3', password: 'user3test123'},
      ]);
    });
};
