const express = require('express');
const cors = require('cors');
const request = require('request');
const dotenv = require('dotenv');
const path=require("path")

dotenv.config();

const app = express();

const corsOptions = {
    origin: ['http://localhost:1234', 'https://react-planet.vercel.app/'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Addresskey', 'X-Content', 'X-Experience', 'X-Lat', 'X-Lng', 'X-Locale', 'X-Mp', 'X-Platform', 'X-Visitor-Id'],
    credentials: true
};

app.use(cors(corsOptions));
app.use(express.static(path.join(__dirname, 'dist')));

// Handle requests to the root URL
app.get('/', (req, res) => {
    res.send('Proxy server is running. Please specify a URL to proxy.');
});

// Handle requests for the favicon
app.get('/favicon.ico', (req, res) => {
    res.status(204); // No content, to prevent the 400 error
});

// Proxy requests to external URLs
app.use('/', (req, res) => {
    const url = req.url.substring(1); // Extract the URL from the request

    if (!url || !url.startsWith('http')) { // Validate the URL
        return res.status(400).send('Invalid URL');
    }

    console.log(`Proxying request to: ${url}`); // Log the URL for debugging

    // Forward the request to the actual URL
    req.pipe(request(url)).pipe(res);
});
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`CORS proxy server running on port ${PORT}`);
});
module.exports = app;
