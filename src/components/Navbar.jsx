import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Navbar = ({ onSearch, searchSuggestions }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = (e) => {
    const term = e.target.value;
    setSearchTerm(term);
    onSearch(term); // Pass the search term up to the parent
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    // You can add any additional search handling logic here if needed
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-white rounded-pill p-3 shadow" style={{ margin: '20px' }}>
      <div className="container-fluid">
        <a className="navbar-brand fw-bold text-dark brand" href="/">FlavorShare</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <a className="nav-link fw-bold text-dark" href="/">Home</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-bold text-dark" href="/login">Login</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-bold text-dark" href="/register">Register</a>
            </li>
            <li className="nav-item">
              <a className="nav-link fw-bold text-dark" href="/about">About</a>
            </li>
          </ul>

          {/* Search Bar */}
          <form className="d-flex position-relative" onSubmit={handleSubmit}>
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search for recipes"
              aria-label="Search"
              value={searchTerm}
              onChange={handleInputChange}
            />
            <button className="btn btn-outline-secondary" type="submit">Search</button>

          
            {searchTerm && searchSuggestions && (
              <div className="search-suggestions position-absolute bg-white shadow-sm p-2" style={{ top: '50px', width: '100%', zIndex: 1 }}>
                {searchSuggestions.length > 0 ? (
                  searchSuggestions.map((suggestion, index) => (
                    <div key={index} className="suggestion-item p-2">
                      {suggestion.title}
                    </div>
                  ))
                ) : (
                  <div className="p-2 text-muted">No results found</div>
                )}
              </div>
            )}
          </form>
        </div>
      </div>
    </nav>
  );
};

Navbar.propTypes = {
  onSearch: PropTypes.func.isRequired,
  searchSuggestions: PropTypes.array, 
};


Navbar.defaultProps = {
  searchSuggestions: [],
};

export default Navbar;
