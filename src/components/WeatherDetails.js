import React from 'react';

const WeatherDetails = ({ weatherData }) => {
    if (!weatherData) return null; // Don't render if no data

    const { main, wind, visibility } = weatherData;

    return (
        <div className="weather-details-section">
            <h3>Weather Details</h3>
            <div className="detail-item">
                <span className="detail-label">Feels Like</span>
                <span className="detail-value">{Math.round(main.feels_like)}°C</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Humidity</span>
                <span className="detail-value">{main.humidity}%</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Wind</span>
                <span className="detail-value">{wind.speed} m/s</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Pressure</span>
                <span className="detail-value">{main.pressure} hPa</span>
            </div>
            <div className="detail-item">
                <span className="detail-label">Visibility</span>
                <span className="detail-value">{(visibility / 1000).toFixed(1)} km</span>
            </div>
        </div>
    );
};

export default WeatherDetails;