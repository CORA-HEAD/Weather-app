import React, { useState } from 'react';
import axios from 'axios';
function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState('');

  const API_KEY =import.meta.env.VITE_OPEN_WEATHER_API;

const formatCityName = (name) => {
  return name
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};

  const getWeather = async () => {
    try {
      const formattedCity = formatCityName(city);
      const response = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${formattedCity}&appid=${API_KEY}&units=metric`
      );
      setWeather(response.data);
      setError('');
    } catch (err) {
      setWeather(null);
      setError('City not found!');
    }
  };

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>🌦️ Weather App</h1>
      <input
        type="text"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        placeholder="Enter city name"
        style={{ padding: '10px', fontSize: '16px' }}
      />
      <button onClick={getWeather} style={{ marginLeft: '10px', padding: '10px' }}>
        Get Weather
      </button>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {weather && (
        <div style={{ marginTop: '20px' }}>
          <h2>{weather.name}</h2>
          <p>🌡️ Temperature: {weather.main.temp} °C</p>
          <p>🌥️ Weather: {weather.weather[0].description}</p>
          <p>💧 Humidity: {weather.main.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
