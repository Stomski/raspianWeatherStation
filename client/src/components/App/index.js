import React, { useState, useEffect } from "react";
import Clock from "../Clock";
import CurrentWeather from "../CurrentWeather";
import WeatherInfo from "../WeatherInfo";
import DailyChart from "../weatherCharts/DailyChart";
import HourlyChart from "../weatherCharts/HourlyChart";
import SunRiseSet from "../SunRiseSet";
import "./styles.css";

const WEATHER_TYPES = {
  CURRENT: "current",
  HOURLY: "hourly",
  DAILY: "daily",
};

const App = () => {
  const [weatherData, setWeatherData] = useState({
    current: null,
    hourly: null,
    daily: null,
  });
  const [error, setError] = useState(null);

  const fetchWeatherData = async (type) => {
    try {
      const response = await fetch(`/api/weather?type=${type}`);
      if (!response.ok) throw new Error("Weather data fetch failed");
      const data = await response.json();
      setWeatherData((prev) => ({ ...prev, [type]: data }));
    } catch (err) {
      console.error(`Error fetching ${type} weather:`, err);
      setError(err.message);
    }
  };

  useEffect(() => {
    // Initial data fetch
    Object.values(WEATHER_TYPES).forEach((type) => fetchWeatherData(type));

    // Set up intervals for data updates
    const intervals = {
      [WEATHER_TYPES.CURRENT]: setInterval(
        () => fetchWeatherData(WEATHER_TYPES.CURRENT),
        10 * 60 * 1000
      ),
      [WEATHER_TYPES.HOURLY]: setInterval(
        () => fetchWeatherData(WEATHER_TYPES.HOURLY),
        60 * 60 * 1000
      ),
      [WEATHER_TYPES.DAILY]: setInterval(
        () => fetchWeatherData(WEATHER_TYPES.DAILY),
        6 * 60 * 60 * 1000
      ),
    };

    return () => {
      Object.values(intervals).forEach((interval) => clearInterval(interval));
    };
  }, []);

  if (error) {
    return (
      <div className="error-container">
        <h1>Weather Station Error</h1>
        <p>{error}</p>
        <p>Retrying...</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <div className="header">
        <Clock />
        <SunRiseSet data={weatherData.daily} />
      </div>

      <div className="main-content">
        <div className="left-panel">
          <CurrentWeather data={weatherData.current} />
          <WeatherInfo data={weatherData.current} />
        </div>

        <div className="right-panel">
          <HourlyChart data={weatherData.hourly} />
          <DailyChart data={weatherData.daily} />
        </div>
      </div>
    </div>
  );
};

export default App;
