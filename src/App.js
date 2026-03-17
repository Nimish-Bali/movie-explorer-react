import { useState } from "react";
import axios from "axios";
import { Routes, Route } from "react-router-dom";
import MovieCard from "./components/MovieCard";
import MovieDetails from "./components/MovieDetails";
import "./App.css";

function App() {
  const [movies, setMovies] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [favorites, setFavorites] = useState([]);

  const fetchMovies = async () => {
    if (!searchTerm) return;

    setLoading(true);
    setError("");

    try {
      const response = await axios.get(
        `https://www.omdbapi.com/?s=${searchTerm}&apikey=9e74997d`
      );

      if (response.data.Response === "True") {
        setMovies(response.data.Search);
      } else {
        setMovies([]);
        setError(response.data.Error);
      }
    } catch (err) {
      setError("Something went wrong");
    }

    setLoading(false);
  };

  const toggleFavorite = (movie) => {
    const exists = favorites.find((fav) => fav.imdbID === movie.imdbID);

    if (exists) {
      setFavorites(favorites.filter((fav) => fav.imdbID !== movie.imdbID));
    } else {
      setFavorites([...favorites, movie]);
    }
  };

  return (
    <div className="container">
      <Routes>
        <Route
          path="/"
          element={
            <>
              <h1 className="title">🎬 Movie Explorer</h1>

              <div className="search-container">
                <input
                  type="text"
                  placeholder="Search movies..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-box"
                />

                <button onClick={fetchMovies} className="search-btn">
                  Search
                </button>
              </div>

              {loading && <div className="spinner"></div>}
              {error && <p className="error">{error}</p>}

              {!loading && movies.length === 0 && !error && (
                <p>No movies to display</p>
              )}

              <div className="movie-grid">
                {movies.map((movie) => (
                  <MovieCard
                    key={movie.imdbID}
                    movie={movie}
                    toggleFavorite={toggleFavorite}
                    favorites={favorites}
                  />
                ))}
              </div>
            </>
          }
        />

        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </div>
  );
}

export default App;