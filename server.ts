import cors from 'cors';
import http from 'http';
import express, { Request, Response } from 'express';

import { CODE } from './helpers/lib/index';
import { Routes } from './api/routes/routes';
import { log, logError } from './helpers/lib/logger';
import { CommonRoutes } from './helpers/utils/common';

import Database from './database/db';

const PORT = 5000;
const app = express();
const server = http.createServer(app);
const routes: Array<CommonRoutes> = [];

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

routes.push(new Routes(app));

app.get('/', (req: Request, res: Response) => {
	return res.status(CODE.SUCCESS).json({
    status: 'success',
    data: 'Hello World',
		message: 'OK',
		code: CODE.SUCCESS
	});
});

app.get('*', (req: Request, res: Response) => {
	logError('server', 'Undefined endpoint accessed!', 'Server');
	return res.status(CODE.NOT_FOUND).json({
		status: 'fail',
    data: null,
		message: 'Cannot get unspecified endpoint',
		code: CODE.NOT_FOUND
	});
});

server.listen(PORT, async () => {
	await Database.connect();
	log('server', `Connected to port:${PORT}`, 'Server');
}).on('error', () => {
	logError('server', `Server error`, 'Server');
	return process.exit(1);
});
