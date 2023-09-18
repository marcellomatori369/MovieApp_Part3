import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import {
    BsGraphUp,
    BsWallet2,
    BsHourglassSplit,
    BsFillFileEarmarkTextFill,
} from 'react-icons/bs'

import MovieCard from "../components/MovieCard"

import './Movie.css'

const moviesURL = import.meta.env.VITE_API;
const apiKey = import.meta.env.VITE_API_KEY;
const bearerToken = import.meta.env.VITE_BEARER_TOKEN;
const favoriteURL = import.meta.env.VITE_FAVORITE;

const Movie = () => {
    const { id } = useParams()
    const [movie, setMovie] = useState(null)
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        const movieUrl = `${moviesURL}movie/${id}?${apiKey}`
        const favoritedUrl = `${favoriteURL}/movies?${apiKey}`;

        const getMovie = async (url) => {
            const res = await fetch(url);
            const data = await res.json();
            setMovie(data);
        }

        const getFavoriteMovies = async (url) => {
            const res = await fetch(url, {
                headers: {
                    Authorization: `Bearer ${bearerToken}`,
                },
            });
            const data = await res.json();

            const isCurrentlyFavorite = data.results.some((favMovie) => favMovie.id === Number(id));
            setIsFavorite(isCurrentlyFavorite);
        };

        getMovie(movieUrl);
        getFavoriteMovies(favoritedUrl);
    }, [id]);

    const formatCurrency = (number) => {
        return number.toLocaleString("pt-BR", {
            style: "currency",
            currency: "BRL"
        })
    }

    const handleToggleFavorite = async () => {
        const requestBody = {
            media_type: 'movie',
            media_id: movie.id,
            favorite: !isFavorite,
        };

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${bearerToken}`,
            },
            body: JSON.stringify(requestBody),
        };

        try {
            const response = await fetch(favoriteURL, requestOptions);
            if (response.ok) {
                setIsFavorite(!isFavorite); 
            } else {
                console.error(`Falha ao ${isFavorite ? "des" : ""}favoritar o filme`);
            }
        } catch (error) {
            console.error(`Erro ao ${isFavorite ? "des" : ""}favoritar o filme:`, error);
        }
    };

    return (
        <div className="movie-page">
            {movie && (
                <>
                    <MovieCard movie={movie} showLink={false} />
                    <p className="tagline">{movie.tagline}</p>
                    <div className="info">
                        <h3>
                            <BsWallet2 /> Orçamento:
                        </h3>
                        <p>{formatCurrency(movie.budget)}</p>
                    </div>
                    <div className="info">
                        <h3>
                            <BsGraphUp /> Lucro:
                        </h3>
                        <p>{formatCurrency(movie.revenue)}</p>
                    </div>
                    <div className="info">
                        <h3>
                            <BsHourglassSplit /> Duração:
                        </h3>
                        <p>{movie.runtime} minutos</p>
                    </div>
                    <div className="info description">
                        <h3>
                            <BsFillFileEarmarkTextFill /> Descrição:
                        </h3>
                        <p>{movie.overview}</p>
                    </div>

                    <div className="button">
                        <button onClick={handleToggleFavorite}>
                            {isFavorite ? "Desfavoritar" : "Favoritar"}
                        </button>
                    </div>
                </>
            )}
        </div>
    );
}

export default Movie;
