// src/components/SearchResults.js
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../api';
import './SearchResults.css';

// Función auxiliar para obtener parámetros de la URL
function useQuery() {
    return new URLSearchParams(useLocation().search);
}

// Componente SearchResults que muestra los resultados de búsqueda
const SearchResults = () => {
    const [results, setResults] = useState([]);
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
        if (query) {
            fetchResults();
        }
    }, [query]);

    return (
        <div className="search-results">
            <h1>Resultados de búsqueda para: "{query}"</h1>
            <div className="results-container">
                {results.map(result => (
                    <div key={result.id} className="result-card">
                        <img 
                            src={`https://image.tmdb.org/t/p/w200${result.poster_path || result.profile_path}`} 
                            alt={result.title || result.name} 
                        />
                        <h3>{result.title || result.name}</h3>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SearchResults;
