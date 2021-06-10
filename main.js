$(document).ready(() => {
    $('#searchForm').on('submit', (e) => {
        console.log($('#searchText').val())
        let searchText = $('#searchText').val();
        getMovies(searchText);
        e.preventDefault();
    });
});

function getMovies(searchText) {
    console.log(searchText)
    axios.get('http://www.omdbapi.com?&apikey=thewdb&s='+searchText)
        .then((response) => {
            console.log(response);
        })
        .catch((err) => {
            console.log(err)
        })
}