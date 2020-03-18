const db = require("../database/dbConfig");

module.exports = {
    findMovie
}

async function findMovie(searchTerm) {
    const movies = await db('imdb_movies')
        .select('movie_id as id','primary_title as title', 'start_year as year', 'runtime_minutes as runtime', 'genres')

    const movies2 = await movies.filter(post => 
        searchTerm !== '' ? post.title.toLowerCase().includes(searchTerm.toLowerCase()) : true).map((x, index) =>  {
            if( index < 100) {
                return {Title: x.title, Year: x.year, Runtime: x.runtime, Genres: x.genres}
            }
        })
    
    return movies2.filter(x => x != null)
} 
