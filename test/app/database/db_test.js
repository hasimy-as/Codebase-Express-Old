const { expect } = require('chai');
const mongoConnect = require('../../../app/database/db');

describe('Database connection', () => {
	it('should able to create connection', (err, done) => {
		expect(mongoConnect());
		done();
	});
});