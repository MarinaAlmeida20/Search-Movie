$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        console.log($('#searchText').val())
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    axios.get('http://www.omdbapi.com?&apikey=thewdb&s='+searchText)
        .then((response) => {
            console.log(response);
            let movies = response.data.Search;
            let output = '';
            $.each(movies, (index, movie) => {
                output += `
                    <div class="column">
                        <div class="well">
                            <img src="${movie.Poster}">
                            <h5>${movie.Title}</h5>
                            <a onclick="movieSelected('${movie.imdbID}')" class="btn" href="#">Movie Details</a>
                        </div>
                    </div>
                `;
            });

            $('#movies').html(output);
        })
        .catch((err) => {
            console.log(err);
        })
}

function movieSelected(id) {
    sessionStorage.setItem('movieId', id);
    window.location = 'movie.html';
    return false;
}

function getMovie() {
    let movieId = sessionStorage.getItem('movieId');

    axios.get('http://www.omdbapi.com?&apikey=thewdb&i='+movieId)
        .then((response) => {
            console.log(response);
            let movie = response.data;

            let output = `
                <div class="row>
                    <div class="column">
                        <img src="${movie.Poster}" class="poster">
                    </div>
                    <div class="column-list">
                        <h2>${movie.Title}</h2>
                        <ul class="list-group">
                            <li class="list-group-item"><strong>Genre:</strong> ${movie.Genre}</li>
                            <li class="list-group-item"><strong>Released:</strong> ${movie.Released}</li>
                            <li class="list-group-item"><strong>Rated:</strong> ${movie.Rated}</li>
                            <li class="list-group-item"><strong>IMDB Rating:</strong> ${movie.imdbRating}</li>
                            <li class="list-group-item"><strong>Director:</strong> ${movie.Director}</li>
                            <li class="list-group-item"><strong>Writer:</strong> ${movie.Writer}</li>
                            <li class="list-group-item"><strong>Actors:</strong> ${movie.Actors}</li>
                            <li class="list-group-item"><strong>Awards:</strong> ${movie.Awards}</li>
                            <li class="list-group-item"><strong>Language:</strong> ${movie.Language}</li>
                            <li class="list-group-item"><strong>Production:</strong> ${movie.Production}</li>
                        </ul>
                    </div>
                </div>
                <div class="row">
                    <div class="well">
                        <h3>Plot</h3>
                        <p class="text">${movie.Plot}</p>
                        <hr>
                        <div class="btn-2">
                            <a href="http://imdb.com/title/${movie.imdbID}" target="_blank" class="btn">View IMDB</a>
                            <a href="index.html" class="btn">Go Back To Search</a>
                        </div>
                    </div>
                </div>
            `;

            $('#movie').html(output);
        })
        .catch((err) => {
            console.log(err);
        })
}