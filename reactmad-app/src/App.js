import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/home';
import Header from './components/Header';
import SearchResults from './components/SearchResults';
import Detail from './components/Detail';
import Footer from './components/Footer';
import Categories from './components/Categories'; // Importar el componente de Categorías
import './App.css';

// Componente principal de la aplicación que renderiza el componente Home y Header
function App() {
    return (
        <Router>
            <div className="App">
                <Header />
                <Routes>
                    <Route exact path="/" element={<Home />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/:type/:id" element={<Detail />} />
                    <Route path="/categories" element={<Categories />} /> {/* Nueva ruta para categorías */}
                </Routes>
                <Footer />
            </div>
        </Router>
    );
}

export default App;
