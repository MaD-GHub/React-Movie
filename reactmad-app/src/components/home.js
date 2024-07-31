// src/components/Home.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../api';
import { FaStar, FaStarHalfAlt, FaRegStar, FaFilm } from 'react-icons/fa';
import './Home.css';

// Función para convertir la valoración en estrellas
const getStars = (rating) => {
    const fullStars = Math.floor(rating / 2);
    const halfStar = rating % 2 >= 1 ? true : false;
    const emptyStars = 5 - fullStars - (halfStar ? 1 : 0);
    return (
        <>
            {[...Array(fullStars)].map((_, i) => <FaStar key={`full-${i}`} />)}
            {halfStar && <FaStarHalfAlt />}
            {[...Array(emptyStars)].map((_, i) => <FaRegStar key={`empty-${i}`} />)}
        </>
    );
};

// Función para mapear IDs de géneros a nombres
const getGenreNames = (genreIds, genres) => {
    return genreIds.map(id => genres.find(genre => genre.id === id)?.name).join(', ');
};

const Home = () => {
    const [movies, setMovies] = useState([]); // Estado para almacenar las películas populares
    const [shows, setShows] = useState([]); // Estado para almacenar las series populares
    const [movieGenres, setMovieGenres] = useState([]); // Estado para almacenar los géneros de películas
    const [showGenres, setShowGenres] = useState([]); // Estado para almacenar los géneros de series

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const moviesResponse = await api.get('/movie/popular');
                const showsResponse = await api.get('/tv/popular');
                setMovies(moviesResponse.data.results);
                setShows(showsResponse.data.results);
            } catch (error) {
                console.error('Error fetching popular movies and shows:', error);
            }
        };

        const fetchGenres = async () => {
            try {
                const movieGenresResponse = await api.get('/genre/movie/list');
                const showGenresResponse = await api.get('/genre/tv/list');
                setMovieGenres(movieGenresResponse.data.genres);
                setShowGenres(showGenresResponse.data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchPopular(); // Obtener las películas y series populares
        fetchGenres(); // Obtener los géneros de películas y series
    }, []);

    return (
        <div className="home">
            <h1>
                <FaFilm style={{ marginRight: '10px' }} />
                Películas Populares
            </h1>
            <div className="movies-container">
                {movies.map(movie => (
                    <div key={movie.id} className="movie-card">
                        <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
                        <h3>{movie.title}</h3>
                        <div className="details">
                            {getStars(movie.vote_average)} {/* Mostrar valoración en estrellas */}
                        </div>
                        <p className="details genre-text">Género: {getGenreNames(movie.genre_ids, movieGenres)}</p>
                        <Link to={`/movie/${movie.id}`}>
                            <button className="more-info-btn">Ver más</button> {/* Botón para ver más detalles */}
                        </Link>
                    </div>
                ))}
            </div>
            <h1>
                <FaFilm style={{ marginRight: '10px' }} />
                Series Populares
            </h1>
            <div className="shows-container">
                {shows.map(show => (
                    <div key={show.id} className="show-card">
                        <img src={`https://image.tmdb.org/t/p/w300${show.poster_path}`} alt={show.name} />
                        <h3>{show.name}</h3>
                        <div className="details">
                            {getStars(show.vote_average)} {/* Mostrar valoración en estrellas */}
                        </div>
                        <p className="details genre-text">Género: {getGenreNames(show.genre_ids, showGenres)}</p>
                        <Link to={`/tv/${show.id}`}>
                            <button className="more-info-btn">Ver más</button> {/* Botón para ver más detalles */}
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
