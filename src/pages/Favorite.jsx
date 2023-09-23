import { useState, useEffect } from "react";
import MovieCard from "../components/MovieCard";

import "./MoviesGrid.css";

const bearerToken = import.meta.env.VITE_BEARER_TOKEN;
const favoriteURL = import.meta.env.VITE_FAVORITE;

const Favorite = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([]);

  const getFavoriteMovies = async (url) => {
    const res = await fetch(url, {
      headers: {
        Authorization: `Bearer ${bearerToken}`, 
      },
    });
    const data = await res.json();

    setFavoriteMovies(data.results);
  };

  useEffect(() => {
    const favoritedUrl = `${favoriteURL}/movies`;

    getFavoriteMovies(favoritedUrl);
  }, []);

  return (
    <div className="container">
      <h2 className="title">Filmes favoritos:</h2>
      <div className="movies-container">
        {favoriteMovies.length === 0 && <p>Sem filmes favoritados</p>}
        {favoriteMovies.length > 0 &&
          favoriteMovies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
      </div>
    </div>
  );
};

export default Favorite;
