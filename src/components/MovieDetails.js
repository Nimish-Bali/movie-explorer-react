import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function MovieDetails() {
    const { id } = useParams();
    const navigate = useNavigate();

    const [movie, setMovie] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMovieDetails = async () => {
            try {
                const res = await axios.get(
                    `https://www.omdbapi.com/?i=${id}&apikey=9e74997d`
                );
                setMovie(res.data);
            } catch (err) {
                console.error(err);
            }
            setLoading(false);
        };

        fetchMovieDetails();
    }, [id]);

    if (loading) return <div className="spinner"></div>;

    return (
        <div className="details-container">

            <div className="back-container">
                <button onClick={() => navigate("/")} className="back-btn">
                    ← Back
                </button>
            </div>

            <h2>{movie.Title}</h2>

            <img
                src={movie.Poster !== "N/A" ? movie.Poster : ""}
                alt={movie.Title}
            />

            <p><strong>Year:</strong> {movie.Year}</p>
            <p><strong>Genre:</strong> {movie.Genre}</p>
            <p><strong>IMDB:</strong> {movie.imdbRating}</p>
            <p><strong>Plot:</strong> {movie.Plot}</p>

        </div>
    );
}

export default MovieDetails;