import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa';
import './Card.css';

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

const Card = ({ item, type, genres }) => {
    const posterUrl = item.poster_path 
        ? `https://image.tmdb.org/t/p/w300${item.poster_path}`
        : 'URL_DE_IMAGEN_DE_RESPALDO';

    const genreNames = item.genre_ids.map(id => genres.find(genre => genre.id === id)?.name).join(', ');

    return (
        <div className="movie-card">
            <img src={posterUrl} alt={item.title || item.name} />
            <h3>{item.title || item.name}</h3>
            <div className="details">
                {getStars(item.vote_average)}
            </div>
            <p className="details genre-text">Género: {genreNames}</p>
            <Link to={`/${type}/${item.id}`}>
                <button className="more-info-btn">Ver más</button>
            </Link>
        </div>
    );
};

export default Card;
