const express = require('express');
const fetch = require('node-fetch');
const app = express();

const DATE_SERVER_HOST = process.env.DATE_SERVER_HOST || 'http://date:3005';

app.get('/api/date', async (req, res) => {
    try {
        const response = await fetch(DATE_SERVER_HOST);
        const date = await response.json();
        res.json(date);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.listen(3000, () => {
    console.log('Server started on port 3000!');
});
