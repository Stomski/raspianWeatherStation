import React from "react";
import "./styles.css";

const CurrentWeather = ({ data }) => {
  if (!data) {
    return (
      <div className="current-weather loading">Loading weather data...</div>
    );
  }

  const {
    temperature,
    temperatureApparent,
    humidity,
    windSpeed,
    windDirection,
    pressureSurfaceLevel,
    weatherCode,
  } = data.values;

  const getWeatherIcon = (code) => {
    // Map Tomorrow.io weather codes to icon classes
    const codeMap = {
      1000: "☀️", // Clear, Sunny
      1100: "🌤️", // Mostly Clear
      1101: "⛅", // Partly Cloudy
      1102: "☁️", // Mostly Cloudy
      1001: "☁️", // Cloudy
      2000: "🌫️", // Fog
      4000: "🌧️", // Drizzle
      4001: "🌧️", // Rain
      4200: "⛈️", // Heavy Rain
      5000: "🌨️", // Snow
      5001: "🌨️", // Flurries
      5100: "🌨️", // Light Snow
      5101: "🌨️", // Heavy Snow
      6000: "🌧️", // Freezing Drizzle
      6001: "🌧️", // Freezing Rain
      7000: "🌨️", // Ice Pellets
      7101: "🌨️", // Heavy Ice Pellets
      8000: "⛈️", // Thunderstorm
    };
    return codeMap[code] || "❓";
  };

  const getWindDirection = (degrees) => {
    const directions = [
      "N",
      "NNE",
      "NE",
      "ENE",
      "E",
      "ESE",
      "SE",
      "SSE",
      "S",
      "SSW",
      "SW",
      "WSW",
      "W",
      "WNW",
      "NW",
      "NNW",
    ];
    const index = Math.round(degrees / 22.5) % 16;
    return directions[index];
  };

  return (
    <div className="current-weather">
      <div className="main-info">
        <div className="temperature">
          <span className="value">{Math.round(temperature)}</span>
          <span className="unit">°C</span>
        </div>
        <div className="weather-icon">{getWeatherIcon(weatherCode)}</div>
      </div>

      <div className="details">
        <div className="detail-item">
          <span className="label">Feels like:</span>
          <span className="value">{Math.round(temperatureApparent)}°C</span>
        </div>
        <div className="detail-item">
          <span className="label">Humidity:</span>
          <span className="value">{Math.round(humidity)}%</span>
        </div>
        <div className="detail-item">
          <span className="label">Wind:</span>
          <span className="value">
            {Math.round(windSpeed)} km/h {getWindDirection(windDirection)}
          </span>
        </div>
        <div className="detail-item">
          <span className="label">Pressure:</span>
          <span className="value">{Math.round(pressureSurfaceLevel)} hPa</span>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
