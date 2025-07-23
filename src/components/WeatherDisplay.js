import React from 'react';

// Helper function to format time
const formatTime = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp * 1000);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
};

// Helper function to format date
const formatDate = (timestamp) => {
    if (!timestamp) return 'N/A';
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
};

const WeatherDisplay = ({ weatherData }) => {
    if (!weatherData) return null; // Don't render if no data

    const { main, name, dt, weather } = weatherData;

    return (
        <div className="main-weather-display">
            <div className="main-weather-content">
                <div className="sidebar-header">The Weather</div> {/* Top left header */}
                <div className="current-temp">
                    {Math.round(main.temp)}
                    <sup>°C</sup>
                    <span className="location-name">{name}</span>
                </div>
                <div className="date-time-info">
                    {formatTime(dt)} - {formatDate(dt)}
                </div>
                <div className="weather-description">
                    {weather[0].description.charAt(0).toUpperCase() + weather[0].description.slice(1)}
                </div>
            </div>
        </div>
    );
};

export default WeatherDisplay;