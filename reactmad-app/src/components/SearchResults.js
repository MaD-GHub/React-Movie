// src/components/SearchResults.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';
import './SearchResults.css';
import Card from './Card';

// Función auxiliar para obtener parámetros de la URL
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

// Componente SearchResults que muestra los resultados de búsqueda
const SearchResults = () => {
    const [results, setResults] = useState([]);
    const [movieGenres, setMovieGenres] = useState([]);
    const [showGenres, setShowGenres] = useState([]);
    const query = useQuery().get('query');

    useEffect(() => {
        const fetchResults = async () => {
            try {
                const response = await api.get('/search/multi', {
                    params: { query }
                });
                setResults(response.data.results);
            } catch (error) {
                console.error('Error fetching search results:', error);
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

        if (query) {
            fetchResults();
            fetchGenres();
        }
    }, [query]);

    return (
        <div className="search-results">
            <h1>Resultados de búsqueda para: "{query}"</h1>
            <div className="results-container">
                {results.map(result => {
                    if (result.media_type === 'movie' || result.media_type === 'tv') {
                        return (
                            <Card 
                                key={result.id} 
                                item={result} 
                                type={result.media_type} 
                                genres={result.media_type === 'movie' ? movieGenres : showGenres} 
                            />
                        );
                    }
                    return null;
                })}
            </div>
        </div>
    );
};

export default SearchResults;
