require("dotenv").config();
const express = require("express");
const cors = require("cors");
const axios = require("axios");
const path = require("path");

const app = express();
const port = process.env.PORT || 3000;

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:8080",
    methods: ["GET"],
  })
);

app.use(express.static(path.join(__dirname, "../client/dist")));

// Cache for weather data
let weatherCache = {
  current: { data: null, timestamp: 0 },
  hourly: { data: null, timestamp: 0 },
  daily: { data: null, timestamp: 0 },
};

const CACHE_DURATIONS = {
  current: process.env.CURRENT_WEATHER_UPDATE * 60 * 1000 || 600000, // 10 minutes
  hourly: process.env.HOURLY_FORECAST_UPDATE * 60 * 1000 || 3600000, // 1 hour
  daily: process.env.DAILY_FORECAST_UPDATE * 60 * 1000 || 21600000, // 6 hours
};

// Weather data endpoint
app.get("/api/weather", async (req, res) => {
  try {
    const now = Date.now();
    const type = req.query.type || "current";

    // Check cache
    if (
      weatherCache[type].data &&
      now - weatherCache[type].timestamp < CACHE_DURATIONS[type]
    ) {
      return res.json(weatherCache[type].data);
    }

    // Fetch new data from Tomorrow.io
    const response = await axios.get(
      `https://api.tomorrow.io/v4/weather/${type}`,
      {
        params: {
          location: `${process.env.LOCATION_LAT},${process.env.LOCATION_LON}`,
          apikey: process.env.WEATHER_API_KEY,
        },
      }
    );

    // Update cache
    weatherCache[type] = {
      data: response.data,
      timestamp: now,
    };

    res.json(response.data);
  } catch (error) {
    console.error("Weather API Error:", error.message);
    // If cache exists, return stale data
    if (weatherCache[type].data) {
      res.json(weatherCache[type].data);
    } else {
      res.status(500).json({ error: "Failed to fetch weather data" });
    }
  }
});

// Serve React app
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist/index.html"));
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: "Something broke!" });
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
  console.log(
    `Location: ${process.env.LOCATION_LAT},${process.env.LOCATION_LON}`
  );
});
