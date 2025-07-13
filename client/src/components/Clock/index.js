import React, { useState, useEffect } from "react";
import { format } from "date-fns";
import "./styles.css";

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="clock">
      <div className="time">{format(time, "HH:mm:ss")}</div>
      <div className="date">{format(time, "EEEE, MMMM d, yyyy")}</div>
    </div>
  );
};

export default Clock;
