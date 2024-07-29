// src/components/TrailerCarousel.js
import React from 'react';
import Slider from 'react-slick';
import { FaFilm } from 'react-icons/fa'; // Importar el icono de película
import './TrailerCarousel.css';

const TrailerCarousel = ({ trailers }) => {
    const settings = {
        dots: true, // Mostrar puntos debajo del carrusel
        infinite: false, // No permitir un loop infinito
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable: false, // No permitir arrastrar los slides
        customPaging: i => (
            <div>
                <FaFilm className="custom-dot" /> {/* Usar el icono de película */}
            </div>
        ),
        appendDots: dots => (
            <div>
                <ul> {dots} </ul>
            </div>
        )
    };

    // Limitar los trailers a los primeros 3
    const limitedTrailers = trailers.slice(0, 3);

    return (
        <div className="trailer-carousel">
            <Slider {...settings}>
                {limitedTrailers.map((trailer) => (
                    <div key={trailer.id} className="trailer-slide">
                        <iframe
                            src={`https://www.youtube.com/embed/${trailer.key}`}
                            frameBorder="0"
                            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                            allowFullScreen
                            title={trailer.name}
                        ></iframe>
                    </div>
                ))}
            </Slider>
        </div>
    );
};

export default TrailerCarousel;
