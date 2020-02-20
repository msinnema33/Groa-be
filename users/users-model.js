const db = require('../database/dbConfig');

module.exports = {
    add,
    findBy,
    getUserById,
    getUserRecommendations
}

function add(user) {
    return db('user')
        .insert(user, 'id')
        .then(ids => {
            const [id] = ids;
            return db('user')
                .where({ id })
                .first();
        })
}

function findBy(username) {
    return db('user')
        .where(username)
        .first();
}

function getUserById(id) {
    return db('user')
        .where({ id })
        .first();
}

function getUserRecommendations(id) {
    return db('recommendations as r')
        .select('r.user_id', 'r.letterboxd_id_uri', 'u.username', 'u.has_letterboxd', 'u.has_imdb', 'u.last_login', 'u.user_preferences' )
        .join('user as u', 'r.user_id', '=', 'u.id')
        .where('r.user_id', id);
}