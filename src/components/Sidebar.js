import React from 'react';
import SearchInput from './SearchInput';
import CityList from './CityList';
import WeatherDetails from './WeatherDetails';

const Sidebar = ({
    searchLocation,
    handleSearchChange,
    handleSearchSubmit,
    cities,
    onCitySelect,
    weatherData // Pass weatherData to WeatherDetails
}) => {
    return (
        <div className="sidebar">
            <SearchInput
                searchLocation={searchLocation}
                handleSearchChange={handleSearchChange}
                handleSearchSubmit={handleSearchSubmit}
            />
            <CityList cities={cities} onCitySelect={onCitySelect} />
            <WeatherDetails weatherData={weatherData} />
        </div>
    );
};

export default Sidebar;