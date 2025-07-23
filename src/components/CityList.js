import React from 'react';

const CityList = ({ cities, onCitySelect }) => {
    return (
        <div className="city-list-section">
            <h3>Popular Cities</h3>
            <ul className="city-list">
                {cities.map((city) => (
                    <li key={city} onClick={() => onCitySelect(city)}>
                        {city}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CityList;