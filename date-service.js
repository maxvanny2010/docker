const express = require('express');
const app = express();
app.get('/', (req, res) => {
	res.json({ date: new Date().toISOString() });
});

app.listen(3005, () => {
	console.log('Server started on port 3005!');
});