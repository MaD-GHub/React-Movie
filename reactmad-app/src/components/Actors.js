// src/components/Actors.js
import React, { useState, useEffect } from 'react';
import api from '../api';
import { Link } from 'react-router-dom';
import './Actors.css';

const Actors = () => {
    const [actors, setActors] = useState([]);

    useEffect(() => {
        const fetchActors = async () => {
            try {
                const response = await api.get('/person/popular');
                setActors(response.data.results);
            } catch (error) {
                console.error('Error fetching actors:', error);
            }
        };

        fetchActors();
    }, []);

    return (
        <div className="actors">
            <h1>Actores Populares</h1>
            <div className="actors-container">
                {actors.map(actor => (
                    <div key={actor.id} className="actor-card">
                        <img src={`https://image.tmdb.org/t/p/w300${actor.profile_path}`} alt={actor.name} />
                        <h3>{actor.name}</h3>
                        <Link to={`/actor/${actor.id}`}>
                            <button className="more-info-btn">Ver más</button>
                        </Link>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Actors;
