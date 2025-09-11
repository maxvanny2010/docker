const express = require('express');
const { default: fetch } = require('node-fetch');
const app = express();

const DATE_SERVER_HOST = process.env.DATE_SERVER_HOST || 'http://localhost:3005';

app.get('/', (req, res) => {
	console.log(DATE_SERVER_HOST);
	fetch(DATE_SERVER_HOST)
		.then(res => res.json())
		.then(date => res.send(`Hello! Current date: ${date}\n`));
});

app.listen(3000, () => {
	console.log('Server started on port 3000!');
});