import React from "react";
import "./styles.css";

const WeatherInfo = ({ data }) => {
  if (!data) {
    return null;
  }

  const { cloudCover, precipitationProbability, visibility, uvIndex } =
    data.values;

  return (
    <div className="weather-info">
      <div className="info-item">
        <span className="label">Cloud Cover</span>
        <span className="value">{Math.round(cloudCover)}%</span>
      </div>
      <div className="info-item">
        <span className="label">Precipitation</span>
        <span className="value">{Math.round(precipitationProbability)}%</span>
      </div>
      <div className="info-item">
        <span className="label">Visibility</span>
        <span className="value">{Math.round(visibility)} km</span>
      </div>
      <div className="info-item">
        <span className="label">UV Index</span>
        <span className="value">{Math.round(uvIndex)}</span>
      </div>
    </div>
  );
};

export default WeatherInfo;
