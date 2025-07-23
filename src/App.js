import React, { useState, useEffect, useCallback } from 'react';
import WeatherDisplay from './components/WeatherDisplay';
import Sidebar from './components/Sidebar';

const App = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [currentLocation, setCurrentLocation] = useState('Pune'); // Default location
    const [searchLocation, setSearchLocation] = useState('');
    const [backgroundStyle, setBackgroundStyle] = useState({
        // Initial fallback background
        backgroundImage: 'linear-gradient(to bottom right, #333, #555)',
        backgroundColor: '#333'
    });
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null);

    // IMPORTANT: Replace with your actual OpenWeatherMap API Key
    const OPENWEATHER_API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY;

    const cities = ['Pune', 'Navi Mumbai', 'Delhi', 'Chennai', 'Bangalore', 'Hyderabad'];

    // Function to fetch weather data from OpenWeatherMap API
    const fetchWeatherData = useCallback(async (location) => {
        setIsLoading(true);
        setError(null); // Clear previous errors
        try {
            if (OPENWEATHER_API_KEY === 'YOUR_OPENWEATHERMAP_API_KEY' || !OPENWEATHER_API_KEY) {
                throw new Error('Please set your OpenWeatherMap API key in App.js');
            }

            const response = await fetch(
                `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${OPENWEATHER_API_KEY}&units=metric`
            );
            if (!response.ok) {
                if (response.status === 401) {
                    throw new Error('Invalid API Key. Please check your OpenWeatherMap API key.');
                }
                throw new Error(`Location "${location}" not found or API error: ${response.statusText || response.status}`);
            }
            const data = await response.json();
            setWeatherData(data);
            setCurrentLocation(location); // Set the location that was successfully fetched
            updateBackground(data.weather[0].main); // Update background based on weather condition
        } catch (err) {
            console.error('Error fetching weather data:', err);
            setError(err.message || 'Failed to fetch weather data. Please try again.');
            setWeatherData(null); // Clear weather data on error
            // Fallback background on error
            setBackgroundStyle({
                backgroundImage: 'linear-gradient(to bottom right, #333, #555)',
                backgroundColor: '#333'
            });
        } finally {
            setIsLoading(false);
        }
    }, [OPENWEATHER_API_KEY]);

    // Effect hook to fetch weather data when the component mounts or current location changes
    useEffect(() => {
        fetchWeatherData(currentLocation);
    }, [fetchWeatherData, currentLocation]);

    // Function to update background based on weather condition with real images from local public folder
    const updateBackground = (weatherMain) => {
        let newBackgroundStyle = {};
        let imagePath = ''; // Variable to hold the local image path

        switch (weatherMain.toLowerCase()) {
            case 'clear':
                imagePath = '/images/clear.jpg'; // Path to your local clear sky image
                break;
            case 'clouds':
                imagePath = '/images/clouds.jpg'; // Path to your local clouds image
                break;
            case 'rain':
            case 'drizzle':
                imagePath = '/images/rain.jpg'; // Path to your local rain image
                break;
            case 'thunderstorm':
                imagePath = '/images/thunderstorm.jpg'; // Path to your local thunderstorm image
                break;
            case 'snow':
                imagePath = '/images/snow.jpg'; // Path to your local snow image
                break;
            case 'mist':
            case 'fog':
            case 'haze':
                imagePath = '/images/mist.jpg'; // Path to your local mist/fog image
                break;
            default:
                imagePath = ''; // No specific image, will use fallback color/gradient
        }

        if (imagePath) {
            newBackgroundStyle = { backgroundImage: `url(${process.env.PUBLIC_URL}${imagePath})` };
            // process.env.PUBLIC_URL ensures correct path in production builds
        } else {
            newBackgroundStyle = { backgroundImage: 'linear-gradient(to bottom right, #4CAF50, #8BC34A)' }; // Default green gradient if no image
        }

        // Always set a background color as a fallback if the image fails to load
        newBackgroundStyle.backgroundColor = '#333'; // Solid dark grey fallback
        setBackgroundStyle(newBackgroundStyle);
    };

    // Handlers for search input and city selection
    const handleSearchChange = (e) => setSearchLocation(e.target.value);
    const handleSearchSubmit = () => {
        if (searchLocation.trim()) {
            fetchWeatherData(searchLocation.trim());
            setSearchLocation('');
        }
    };
    const handleCitySelect = (city) => fetchWeatherData(city);

    return (
        <div style={backgroundStyle} className="weather-app-container">
            {isLoading && !error && (
                <div className="loading-message">Loading weather data...</div>
            )}

            {error && (
                <div className="error-message">
                    <p>Error: {error}</p>
                    <p>Please ensure your API key is correct and try again.</p>
                </div>
            )}

            {weatherData && !isLoading && !error && (
                <>
                    <WeatherDisplay weatherData={weatherData} />
                    <Sidebar
                        searchLocation={searchLocation}
                        handleSearchChange={handleSearchChange}
                        handleSearchSubmit={handleSearchSubmit}
                        cities={cities}
                        onCitySelect={handleCitySelect}
                        weatherData={weatherData}
                    />
                </>
            )}
        </div>
    );
};

export default App;