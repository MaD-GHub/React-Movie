// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import Detail from './components/Detail';
import Footer from './components/Footer';
import Categories from './components/Categories';
import Actors from './components/Actors';
import ActorDetail from './components/ActorDetail';
import './App.css';

function App() {
    return (
        <Router>
            <div className="App">
                <Header /> {/* Componente Header se muestra en todas las rutas */}
                <Routes>
                    <Route exact path="/" element={<Home />} /> {/* Ruta para la página principal */}
                    <Route path="/search" element={<SearchResults />} /> {/* Ruta para los resultados de búsqueda */}
                    <Route path="/:type/:id" element={<Detail />} /> {/* Ruta para los detalles de películas/series */}
                    <Route path="/categories" element={<Categories />} /> {/* Ruta para la página de categorías */}
                    <Route path="/actors" element={<Actors />} /> {/* Ruta para la página de actores */}
                    <Route path="/actor/:id" element={<ActorDetail />} /> {/* Ruta para los detalles de un actor */}
                </Routes>
                <Footer /> {/* Componente Footer se muestra en todas las rutas */}
            </div>
        </Router>
    );
}

export default App;
