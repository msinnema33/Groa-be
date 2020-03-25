const db = require("../database/dbConfig");

module.exports = {
    findMovie
}

async function findMovie(searchTerm, submit, genres2, year2) {
    const movies = await db('imdb_movies')
        .select('movie_id as id','primary_title as title', 'start_year as year', 'runtime_minutes as runtime', 'genres', 'poster_url', 'average_rating')
        .orderBy('average_rating', 'desc')
    if (searchTerm.length >= 4 || submit === true) {
    const movies2 = movies.filter(x => x.average_rating != null)
    const movies3 = await movies2.filter(post => 
        searchTerm !== '' || genres2 ? post.genres.toLowerCase().includes(genres2.toLowerCase()) && post.title.toLowerCase().includes(searchTerm.toLowerCase()) && post.year.toString().toLowerCase().includes(year2.toString().toLowerCase())  : true).map((x, index) =>  {
            if( index < 300) {
                return {Title: x.title, Year: x.year, Runtime: x.runtime, Genres: x.genres, Poster: x.poster_url, Average_Rating: x.average_rating}
            }
        })
        const movies4 = await movies3.filter(x => x != null)
        return movies4
    }
} 

