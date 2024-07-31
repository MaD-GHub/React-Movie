// src/components/ActorDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import { FaFilm } from 'react-icons/fa';  // Importar el icono de película
import './ActorDetail.css';

// Componente ActorDetail que muestra la información detallada de un actor
const ActorDetail = () => {
    const { id } = useParams();
    const [actor, setActor] = useState(null);
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchActor = async () => {
            try {
                const actorResponse = await api.get(`/person/${id}`);
                const moviesResponse = await api.get(`/person/${id}/movie_credits`);

                setActor(actorResponse.data);
                setMovies(moviesResponse.data.cast);
            } catch (error) {
                console.error('Error fetching actor details:', error);
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchActor();
    }, [id]);

    const calculateAge = (birthdate) => {
        const birthDate = new Date(birthdate);
        const difference = Date.now() - birthDate.getTime();
        const age = new Date(difference);
        return Math.abs(age.getUTCFullYear() - 1970);
    };

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    return (
        <div className="actor-detail">
            <div className="actor-info">
                <img
                    className="actor-photo"
                    src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`}
                    alt={actor.name}
                />
                <div className="info">
                    <h1>{actor.name}</h1>
                    <p>Fecha de nacimiento: {actor.birthday}</p>
                    <p>Edad: {calculateAge(actor.birthday)}</p>
                    <p>Nacionalidad: {actor.place_of_birth}</p>
                </div>
            </div>
            <div className="actor-movies">
                <h2>
                    <FaFilm style={{ marginRight: '10px' }} />
                    Películas en las cuales participó
                </h2>
                <div className="movies-container">
                    {movies.map(movie => (
                        <div key={movie.id} className="movie-card">
                            <img src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`} alt={movie.title} />
                            <h3>{movie.title}</h3>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ActorDetail;
