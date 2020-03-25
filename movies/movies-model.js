const db = require("../database/dbConfig");

module.exports = {
    findMovie
}

async function findMovie(searchTerm, submit, genres2, year2) {
    const movies = await db('imdb_movies')
        .select('movie_id as id','primary_title as title', 'start_year as year', 'runtime_minutes as runtime', 'genres', 'poster_url', 'average_rating')
        .orderBy('average_rating', 'desc')
    const movies2 = await movies.filter(post => 
        searchTerm !== '' || genres2 ? post.genres.toLowerCase().includes(genres2.toLowerCase()) && post.title.toLowerCase().includes(searchTerm.toLowerCase()) && post.year.toString().toLowerCase().includes(year2.toString().toLowerCase())  : true).map((x, index) =>  {
            if( index < 100) {
                return {Title: x.title, Year: x.year, Runtime: x.runtime, Genres: x.genres, Poster: x.poster_url, Average_Rating: x.average_rating}
            }
        })
    
        if (searchTerm.length >= 4 || submit === true) {
            return movies2.filter(x => x != null && x.Average_Rating != null)}

} 

