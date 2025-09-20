const express = require('express');
const app = express();
const path = require('path');

const DATE_SERVER_HOST = process.env.DATE_SERVER_HOST || 'http://date-service:3005';

app.use('/static', express.static(path.join(__dirname, 'static')));

app.get('/', async (req, res) => {
    try {
        const response = await fetch(DATE_SERVER_HOST);
        const data = await response.json();
        const formattedDate = new Date(data.date).toLocaleString("ru-RU", {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
        });

        const html = `
<!doctype html>
<html lang="ru">
<head>
    <meta charset="utf-8" />
    <meta content="width=device-width,initial-scale=1" name="viewport" />
    <title>Result Service</title>
    <link href="/static/css/style.css" rel="stylesheet" />
</head>
<body>
<main class="page">
    <div class="container">
        <h1>Result Service 🚀</h1>
        <p>Current date-time from date-service:</p>
        <p class="date-output">
             <span class="date-display">${formattedDate}</span>
        </p>
    </div>
</main>
</body>
</html>
        `;
        res.send(html);
    } catch (err) {
        res.status(500).send(`Error fetching date: ${err.message}`);
    }
});

app.listen(3000, () => {
    console.log('Result-service started on port 3000!');
});
