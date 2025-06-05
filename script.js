
const apiKey = 'your_tmdb_api_key'; // Replace with your TMDb API key
const searchInput = document.getElementById('searchInput');
const moviesContainer = document.getElementById('moviesContainer');

searchInput.addEventListener('input', () => {
  const query = searchInput.value;
  if (query.length > 2) {
    fetchMovies(query);
  }
});

async function fetchMovies(query) {
  const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
  const res = await fetch(url);
  const data = await res.json();
  displayMovies(data.results);
}

function displayMovies(movies) {
  moviesContainer.innerHTML = '';
  movies.forEach(movie => {
    const posterPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : '';
    const movieEl = document.createElement('div');
    movieEl.classList.add('movie-card');
    movieEl.innerHTML = `
      <img src="${posterPath}" alt="${movie.title}" />
      <h3>${movie.title}</h3>
      <p>${movie.release_date} • Rating: ${movie.vote_average}</p>
      <p>${movie.overview}</p>
      <a href="${posterPath}" download>
        <button class="download-btn">Download Poster</button>
      </a>
    `;
    moviesContainer.appendChild(movieEl);
  });
}
