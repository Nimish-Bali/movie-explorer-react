import { Link } from "react-router-dom";

function MovieCard({ movie, toggleFavorite, favorites }) {
  const isFav = favorites.some(
    (fav) => fav.imdbID === movie.imdbID
  );

  return (
    <Link
      to={`/movie/${movie.imdbID}`}
      style={{ textDecoration: "none", color: "white" }}
    >
      <div className="movie-card">

        <button
          className="fav-btn"
          onClick={(e) => {
            e.preventDefault();
            toggleFavorite(movie);
          }}
        >
          {isFav ? "❤️" : "🤍"}
        </button>

        <img
          src={movie.Poster !== "N/A" ? movie.Poster : ""}
          alt={movie.Title}
        />

        <h3>{movie.Title}</h3>
        <p>{movie.Year}</p>

      </div>
    </Link>
  );
}

export default MovieCard;