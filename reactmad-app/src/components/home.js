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

// Función para obtener una película aleatoria de una lista
const getRandomMovie = (movies) => {
    return movies[Math.floor(Math.random() * movies.length)];
};

// Componente Home que muestra las películas y series más populares
const Home = () => {
    const [movies, setMovies] = useState([]);
    const [shows, setShows] = useState([]);
    const [movieGenres, setMovieGenres] = useState([]);
    const [showGenres, setShowGenres] = useState([]);
    const [featuredMovie, setFeaturedMovie] = useState(null);

    useEffect(() => {
        const fetchPopular = async () => {
            try {
                const moviesResponse = await api.get('/movie/top_rated');
                const showsResponse = await api.get('/tv/popular');
                setMovies(moviesResponse.data.results.slice(0, 10));
                setShows(showsResponse.data.results.slice(0, 10));
                setFeaturedMovie(getRandomMovie(moviesResponse.data.results));
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

        fetchPopular();
        fetchGenres();
    }, []);

    return (
        <div className="home">
            {/* Sección destacada al estilo Netflix */}
            {featuredMovie && (
                <div className="featured">
                    <img 
                        src={`https://image.tmdb.org/t/p/original${featuredMovie.backdrop_path}`} 
                        alt={featuredMovie.title} 
                        className="featured-image"
                    />
                    <div className="featured-info">
                        <h1 className="featured-title">{featuredMovie.title}</h1>
                        <p className="featured-overview">{featuredMovie.overview}</p>
                        <Link to={`/movie/${featuredMovie.id}`}>
                            <button className="play-button">Ver más detalles</button>
                        </Link>
                    </div>
                </div>
            )}

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
                            {getStars(movie.vote_average)}
                        </div>
                        <p className="details genre-text">Género: {getGenreNames(movie.genre_ids, movieGenres)}</p>
                        <Link to={`/movie/${movie.id}`}>
                            <button className="more-info-btn">Ver más</button>
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
                            {getStars(show.vote_average)}
                        </div>
                        <p className="details genre-text">Género: {getGenreNames(show.genre_ids, showGenres)}</p>
                        <Link to={`/tv/${show.id}`}>
                            <button className="more-info-btn">Ver más</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
