import React from 'react';

const SearchInput = ({ searchLocation, handleSearchChange, handleSearchSubmit }) => {
    return (
        <div className="search-section">
            <input
                type="text"
                className="search-input"
                placeholder="Search Location..."
                value={searchLocation}
                onChange={handleSearchChange}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                        handleSearchSubmit();
                    }
                }}
            />
            <button className="search-button" onClick={handleSearchSubmit}>
                &#x1F50D; {/* Magnifying glass icon */}
            </button>
        </div>
    );
};

export default SearchInput;