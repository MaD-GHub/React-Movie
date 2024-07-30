import React, { useState, useEffect } from 'react';
import api from '../api';
import Card from './Card';
import './Categories.css';

const Categories = () => {
    const [genres, setGenres] = useState([]);
    const [selectedGenre, setSelectedGenre] = useState('');
    const [movies, setMovies] = useState([]);

    useEffect(() => {
        const fetchGenres = async () => {
            try {
                const genresResponse = await api.get('/genre/movie/list');
                setGenres(genresResponse.data.genres);
            } catch (error) {
                console.error('Error fetching genres:', error);
            }
        };

        fetchGenres();
    }, []);

    useEffect(() => {
        if (selectedGenre) {
            const fetchMovies = async () => {
                try {
                    const moviesResponse = await api.get('/discover/movie', {
                        params: {
                            with_genres: selectedGenre
                        }
                    });
                    setMovies(moviesResponse.data.results);
                } catch (error) {
                    console.error('Error fetching movies:', error);
                }
            };

            fetchMovies();
        }
    }, [selectedGenre]);

    return (
        <div className="categories">
            <h1>Categorías</h1>
            <div className="filter-container">
                <label htmlFor="genre">Filtrar por género:</label>
                <select id="genre" value={selectedGenre} onChange={(e) => setSelectedGenre(e.target.value)}>
                    <option value="">Seleccionar género</option>
                    {genres.map((genre) => (
                        <option key={genre.id} value={genre.id}>{genre.name}</option>
                    ))}
                </select>
            </div>
            <div className="movies-container">
                {movies.map(movie => (
                    <Card key={movie.id} item={movie} type="movie" genres={genres} />
                ))}
            </div>
        </div>
    );
};

export default Categories;
