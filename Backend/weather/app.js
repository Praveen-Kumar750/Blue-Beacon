const express = require('express');
const axios = require('axios');
const morgan = require('morgan');

const app = express();

// Your provided API key and base URL
const API_KEY = '1f57c59b88d710cdb7e9baff5b74c0f5';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';

app.use(morgan('dev')); // Use morgan to log HTTP requests

// Route to get weather data
app.get('/weather', async (req, res) => {
    const city = req.query.city;

    // Check if the city query parameter is provided
    if (!city) {
        return res.status(400).json({ error: 'City parameter is required' });
    }

    try {
        // Construct the full API URL using the provided city and API key
        const url = `${BASE_URL}${city}&appid=${API_KEY}`;

        // Make a request to the OpenWeatherMap API
        const response = await axios.get(url);

        // Extract essential data from the API response
        const data = response.data;
        const weatherData = {
            city: data.name,
            temperature: data.main.temp,
            feels_like: data.main.feels_like,
            humidity: data.main.humidity,
            pressure: data.main.pressure,
            weather: data.weather[0].description,
            wind_speed: data.wind.speed,
        };

        // Return the weather data as a JSON response
        res.status(200).json(weatherData);
    } catch (error) {
        // Handle errors from the API request
        console.error('Error fetching weather data:', error);

        // Respond with a relevant error message
        res.status(500).json({ error: 'Failed to fetch weather data. Please try again later.' });
    }
});

// Start the server on port 3000 or the port provided by the environment
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
