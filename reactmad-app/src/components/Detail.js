// src/components/Detail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import api from '../api';
import './Detail.css';
import TrailerCarousel from './TrailerCarousel';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';

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

// Componente Detail que muestra la información detallada de una película, serie o actor
const Detail = () => {
    const { type, id } = useParams();
    const [detail, setDetail] = useState(null);
    const [credits, setCredits] = useState(null);
    const [trailers, setTrailers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

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
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };
        fetchDetail();
    }, [type, id]);

    if (loading) return <div>Cargando...</div>;
    if (error) return <div>{error}</div>;

    const getGenreNames = (genres) => {
        return genres.map(genre => genre.name).join(', ');
    };

    const getDirector = (crew) => {
        const director = crew.find(member => member.job === 'Director');
        return director ? director.name : 'Desconocido';
    };

    return (
        <div className="detail">
            <div className="detail-container">
                <div className="left-section">
                    <img 
                        className="poster" 
                        src={`https://image.tmdb.org/t/p/w300${detail.poster_path}`} 
                        alt={detail.title || detail.name} 
                    />
                    <div className="rating-box">
                        <h3>Valoración</h3>
                        <div className="stars">
                            {getStars(detail.vote_average)}
                        </div>
                        <h3>Fecha de estreno</h3>
                        <p>{detail.release_date || detail.first_air_date}</p>
                        <h3>Director</h3>
                        <p>{getDirector(credits.crew)}</p>
                    </div>
                </div>
                <div className="info">
                    <h1>{detail.title || detail.name}</h1>
                    <h2>{getGenreNames(detail.genres)}</h2>
                    <p>{detail.overview}</p>
                    <h3>Reparto:</h3>
                    <ul>
                        {credits.cast.slice(0, 5).map(member => (
                            <li key={member.cast_id}>
                                <strong>{member.name}</strong> <span>como:</span> <span>{member.character}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
            {trailers.length > 0 && (
                <div className="trailer-section">
                    <h3>Trailers</h3>
                    <TrailerCarousel trailers={trailers} />
                </div>
            )}
        </div>
    );
};

export default Detail;
