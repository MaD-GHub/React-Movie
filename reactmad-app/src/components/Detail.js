// src/components/Detail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import './Detail.css';

// Componente Detail que muestra la información detallada de una película, serie o actor
const Detail = () => {
    const { type, id } = useParams();
    const [detail, setDetail] = useState(null);
    const [credits, setCredits] = useState(null);

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const detailResponse = await api.get(`/${type}/${id}`);
                const creditsResponse = await api.get(`/${type}/${id}/credits`);
                setDetail(detailResponse.data);
                setCredits(creditsResponse.data);
            } catch (error) {
                console.error('Error fetching detail:', error);
            }
        };
        fetchDetail();
    }, [type, id]);

    if (!detail || !credits) return <div>Cargando...</div>;

    const getGenreNames = (genreIds) => {
        return genreIds.map(genre => genre.name).join(', ');
    };

    return (
        <div className="detail">
            <img 
                className="poster" 
                src={`https://image.tmdb.org/t/p/w300${detail.poster_path}`} 
                alt={detail.title || detail.name} 
            />
            <div className="info">
                <h1>{detail.title || detail.name}</h1>
                <h2>{getGenreNames(detail.genres)}</h2>
                <p>{detail.overview}</p>
                <h3>Reparto:</h3>
                <ul>
                    {credits.cast.slice(0, 5).map(member => (
                        <li key={member.cast_id}>
                            {member.name} como {member.character}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Detail;
