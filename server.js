const express = require('express');
const logger = require('./app/lib/logger');
const { CODE } = require('./app/lib/index');
const env = require('./app/config/config');
const users = require('./app/api/user');
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', users);
app.get('/', (req, res) =>
	res.status(CODE.SUCCESS).json({
		message: 'This server is running properly',
		data: null,
	}),
).get('*', (req, res) => {
	res.status(CODE.NOT_FOUND).json({
		message: 'cannot get unspecified endpoint',
		data: null,
	});
});

app.listen(process.env.PORT || env.get('/port'), (err) => {
	if (err) throw err;
	let ctx = 'app-listen';
	logger.log(ctx, 'connected!', 'application running');
});

module.exports = app;
