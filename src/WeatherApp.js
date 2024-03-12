import "./App.css";
import React, { useState } from "react";

const apiKey = "e08c0d5e171da8c23673b19568a48a96";
const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const handleSearch = async () => {
    try {
      const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
      if (!response.ok) {
        setError("City not found!");
        setWeatherData(null);
        return;
      }
      const data = await response.json();
      setWeatherData(data);
      setError("");
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data. Please try again later.");
      setWeatherData(null);
    }
  };

  return (
    <div className="weather-app">
      <div className="search">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="Enter city name"
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      {error && <div className="error">{error}</div>}
      {weatherData && (
        <div className="weather">
          <div className="city">{weatherData.name}</div>
          <div className="temp">{Math.round(weatherData.main.temp)}°C</div>
          <div className="humidity">{weatherData.main.humidity}%</div>
          <div className="wind">{weatherData.wind.speed}km/h</div>
          {/* <img
            className="weather-icon"
            src={`images/${weatherData.weather[0].main.toLowerCase()}.png`}
            alt="Weather Icon"
          /> */}
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
