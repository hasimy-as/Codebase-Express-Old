const express = require('express');
const logger = require('./app/lib/logger');
const { STATUS, CODE } = require('./app/lib/index');
const env = require('./app/config/config');
const mongoConnect = require('./app/database/db');
const users = require('./app/api/user');
const app = express();

mongoConnect();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/', users);
app.get('/', (req, res) =>
	res.json({
		status: STATUS.SUCCESS,
		message: 'This server is running properly',
		data: null,
		code: CODE.SUCCESS,
	}),
).get('*', (req, res) => {
	res.json({
		status: STATUS.NOT_FOUND,
		message: 'cannot get unspecified endpoint',
		data: null,
		code: CODE.NOT_FOUND,
	});
});

app.listen(process.env.PORT || env.get('/port'), (err) => {
	if (err) throw err;
	let ctx = 'app-listen';
	logger.log(ctx, 'connected!', 'application running');
});
