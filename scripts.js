const BASE_URL = "https://api.themoviedb.org/3"
const API_KEY = "api_key=b4b5f9d98442f11bbdd50a5adf70f1d1"
const LANGUAGE = "language=pt-BR"
const IMG_BASE = "https://image.tmdb.org/t/p/w500"
const homeSection = document.getElementById("inicio");

const categoriasFilmes = ['popular', 'top_rated', 'upcoming', 'now_playing']

//const carrossel = document.querySelector(".carrossel")

async function getMovies(categoria) {
    try {
        for(let i = 1; i <= 4; i++) {
           let res = await fetch(`${BASE_URL}/movie/${categoria}?${API_KEY}&${LANGUAGE}&page=${i}`) 
           let movies = await res.json()
    
           movies.results.forEach(filme => {
            document.querySelector(`.${categoria}`).innerHTML += `
                <img onclick="showDetails(${filme.id})" src="${IMG_BASE + filme.poster_path}"  
                     alt="${filme.title} poster"
                />`
           })
        }
    } catch(e) {
        console.log(e)
    }
}

async function getSingularMovie(id) {
    try {
        let res = await fetch(`${BASE_URL}/movie/${id}?${API_KEY}&${LANGUAGE}`)
        let movie = await res.json()
        
        return movie
    } catch (e) {
        console.log(e)
    }
}

async function showDetails(movieId) {
    let movie = await getSingularMovie(movieId)

    let averageClass = movie.vote_average >= 7 ? "good" :
            movie.vote_average >= 4 ? "regular" : "bad"
    let formattedReleaseDate = movie.release_date.split("-").reverse().join("/")

    homeSection.innerHTML = `
        <div>
            <h1>${movie.title}</h1>
            <p>${movie.overview}</p>
            <p>Data de lançamento: ${formattedReleaseDate}</p>
            <p>Gêneros: ${movie.genres.map(genre => " " + genre.name)}</p>
            <span class=${averageClass}>
                ${(movie.vote_average * 10).toFixed(0)}% gostaram
            </span>
        </div>
        <img src="${IMG_BASE + movie.backdrop_path}" />
    `
}
 
function goLeft(categoria) {
    document.querySelector(`.${categoria}`).scrollLeft -= 1500   
}

function goRight(categoria) {
    document.querySelector(`.${categoria}`).scrollLeft += 1500
}

/* setInterval(() => {
    if(carrossel.scrollLeft + 2000 >= carrossel.scrollWidth) {
        carrossel.scrollLeft = 0
    } else {
        goRight()
    }
}, 1500)
 */

categoriasFilmes.forEach(categoria => getMovies(categoria))