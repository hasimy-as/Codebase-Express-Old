import mongoose from 'mongoose';
import { log, logError } from '../helpers/lib/logger';

export default class Database {
	static async connect(): Promise<void> {
		const ctx = 'database-connect';
		const mongoDb = await mongoose.connect('mongodb://localhost:27017/codebase-express', {
			useNewUrlParser: true,
			useUnifiedTopology: true
		});

		if (mongoDb) {
			log(ctx, 'Connected to database', 'Database');
		} else {
			logError(ctx, 'Error connecting to database', 'Database');
		}
	}
}
