const express = require('express');
const cors = require('cors');
const request = require('request');
const dotenv = require('dotenv');


dotenv.config();


const app = express();
const corsOptions = {
     origin:['http://localhost:1234', "http://localhost:8080","https://react-planet.vercel.app/" ],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type', 'Authorization', 'X-Addresskey', 'X-Content', 'X-Experience', 'X-Lat', 'X-Lng', 'X-Locale', 'X-Mp', 'X-Platform', 'X-Visitor-Id'],
    credentials: true
};

app.use(cors(corsOptions));

app.use('/', (req, res) => {
    const url = req.url.substring(1);
    const fullUrl = url.startsWith('http') ? url : `https://${url}`;  // Ensure correct protocol is used
    req.pipe(request(fullUrl)).pipe(res);
});

const PORT = process.env.PORT || 4000;
app.listen(PORT,`0.0.0.0`, () => {
    console.log(`CORS proxy server running on port ${PORT}`);
});  

