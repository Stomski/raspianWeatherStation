import React from "react";
import { format } from "date-fns";
import "./styles.css";

const SunRiseSet = ({ data }) => {
  if (!data || !data.timelines.daily[0]) {
    return null;
  }

  const today = data.timelines.daily[0];
  const { sunriseTime, sunsetTime } = today.values;

  return (
    <div className="sun-times">
      <div className="sun-item">
        <span className="icon">🌅</span>
        <span className="time">{format(new Date(sunriseTime), "HH:mm")}</span>
        <span className="label">Sunrise</span>
      </div>
      <div className="sun-item">
        <span className="icon">🌇</span>
        <span className="time">{format(new Date(sunsetTime), "HH:mm")}</span>
        <span className="label">Sunset</span>
      </div>
    </div>
  );
};

export default SunRiseSet;
