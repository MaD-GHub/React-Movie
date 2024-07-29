// src/components/Detail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import './Detail.css';
import TrailerCarousel from './TrailerCarousel';  // Importar el componente de TrailerCarousel

// Componente Detail que muestra la información detallada de una película, serie o actor
const Detail = () => {
    const { type, id } = useParams();
    const [detail, setDetail] = useState(null);
    const [credits, setCredits] = useState(null);
    const [trailers, setTrailers] = useState([]);
    const [loading, setLoading] = useState(true);  // Añadir estado de carga
    const [error, setError] = useState(null);  // Añadir estado de error

    useEffect(() => {
        const fetchDetail = async () => {
            try {
                const detailResponse = await api.get(`/${type}/${id}`);
                const creditsResponse = await api.get(`/${type}/${id}/credits`);
                const trailersResponse = await api.get(`/${type}/${id}/videos`);

                setDetail(detailResponse.data);
                setCredits(creditsResponse.data);
                setTrailers(trailersResponse.data.results);
            } catch (error) {
                console.error('Error fetching detail:', error);
                setError('Error fetching data');  // Establecer mensaje de error
            } finally {
                setLoading(false);  // Establecer estado de carga a false
            }
        };
        fetchDetail();
    }, [type, id]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;  // Mostrar mensaje de error si existe

    const getGenreNames = (genres) => {
        return genres.map(genre => genre.name).join(', ');
    };

    return (
        <div className="detail">
            <div className="detail-container">
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
            {trailers.length > 0 && (
                <div className="trailer-section">
                    <h3>Trailers:</h3>
                    <TrailerCarousel trailers={trailers} />
                </div>
            )}
        </div>
    );
};

export default Detail;
