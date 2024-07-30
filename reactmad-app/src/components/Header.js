import React, { useState } from 'react';
import './Header.css';
import { useNavigate, Link } from 'react-router-dom';
import { FaSearch } from 'react-icons/fa';

const Header = () => {
    const [query, setQuery] = useState('');
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (query) {
            navigate(`/search?query=${query}`);
        }
    };

    return (
        <header className="header">
            <div className="logo-container">
                <img src="https://i.pinimg.com/736x/b3/e3/82/b3e382a23621e635bcc3fe8c565280b5.jpg" alt="Logo" className="logo" />
                <div className="divider"></div>
            </div>
            <nav className="nav">
                <Link to="/" className="nav-link">Inicio</Link>
                <Link to="/categories" className="nav-link">Categorías</Link>
            </nav>
            <div className="search-bar">
                <form onSubmit={handleSearch}>
                    <FaSearch className="search-icon" />
                    <input 
                        type="text" 
                        placeholder="Buscar..." 
                        value={query} 
                        onChange={(e) => setQuery(e.target.value)} 
                    />
                </form>
            </div>
        </header>
    );
};

export default Header;
