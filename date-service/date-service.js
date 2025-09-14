const express = require('express');
const app = express();

app.get('/', (req, res) => {
	res.json({ date: new Date().toISOString() });
});

app.listen(3005, () => {
	console.log('Date-service started on port 3005!');
});