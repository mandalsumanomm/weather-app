const express = require('express');
const axios = require('axios');
const app = express();
require('dotenv').config();

const PORT = process.env.PORT || 3000;
const API_KEY = process.env.OPENWEATHERMAP_API_KEY;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.render('index', { weather: null, error: null });
});

app.post('/', async (req, res) => {
    const city = req.body.city;
    const units = 'metric'; // Set units to metric for temperature in Celsius
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${units}&appid=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const weather = response.data;

        console.log('Weather data:', weather);

        // Extract relevant information from the weather object
        const temperature = weather.main.temp;
        const description = weather.weather[0].description;
        const sunriseTime = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(weather.sys.sunset * 1000).toLocaleTimeString();
        const humidity = weather.main.humidity;
        const feelsLike = weather.main.feels_like;
        const minTemperature = weather.main.temp_min;
        const maxTemperature = weather.main.temp_max;
        const pressure = weather.main.pressure;
        const windSpeed = weather.wind.speed;
        const visibility = weather.visibility;
        const clouds = weather.clouds.all;
        const weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`; // Weather icon URL

        res.render('index', {
            weather: {
                city,
                description,
                temperature,
                sunriseTime,
                sunsetTime,
                humidity,
                feelsLike,
                minTemperature,
                maxTemperature,
                pressure,
                windSpeed,
                visibility,
                clouds,
                weatherIcon // Include weather icon URL in the response
            },
            error: null
        });
    } catch (error) {
        console.error('Error fetching weather data:', error.message);

        let errorMessage = 'Error, please try again';

        if (error.response) {
            errorMessage = `API responded with status ${error.response.status}: ${JSON.stringify(error.response.data)}`;
        } else if (error.request) {
            errorMessage = 'No response received from the API';
        } else {
            errorMessage = error.message;
        }

        res.render('index', { weather: null, error: errorMessage });
    }
});

app.get('/location', async (req, res) => {
    const { lat, lon } = req.query;
    const units = 'metric';
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;

    try {
        const response = await axios.get(url);
        const weather = response.data;

        console.log('Weather data:', weather);

        // Extract relevant information from the weather object
        const temperature = weather.main.temp;
        const description = weather.weather[0].description;
        const sunriseTime = new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
        const sunsetTime = new Date(weather.sys.sunset * 1000).toLocaleTimeString();
        const humidity = weather.main.humidity;
        const feelsLike = weather.main.feels_like;
        const minTemperature = weather.main.temp_min;
        const maxTemperature = weather.main.temp_max;
        const pressure = weather.main.pressure;
        const windSpeed = weather.wind.speed;
        const visibility = weather.visibility;
        const clouds = weather.clouds.all;
        const weatherIcon = `http://openweathermap.org/img/wn/${weather.weather[0].icon}@4x.png`; // Weather icon URL

        res.json({
            weather: {
                city: weather.name,
                description,
                temperature,
                sunriseTime,
                sunsetTime,
                humidity,
                feelsLike,
                minTemperature,
                maxTemperature,
                pressure,
                windSpeed,
                visibility,
                clouds,
                weatherIcon // Include weather icon URL in the response
            },
            error: null
        });
    } catch (error) {
        console.error('Error fetching weather data:', error.message);

        let errorMessage = 'Error, please try again';

        if (error.response) {
            errorMessage = `API responded with status ${error.response.status}: ${JSON.stringify(error.response.data)}`;
        } else if (error.request) {
            errorMessage = 'No response received from the API';
        } else {
            errorMessage = error.message;
        }

        res.json({ weather: null, error: errorMessage });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
