const express = require('express');
const app = express();

const DATE_SERVER_HOST = process.env.DATE_SERVER_HOST || 'http://date-service:3005';

app.get('/', async (req, res) => {
	try {
		const response = await fetch(DATE_SERVER_HOST);
		const data = await response.json();
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
          <p>Current date from date-service: <span id="date">${data.date}</span></p>
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