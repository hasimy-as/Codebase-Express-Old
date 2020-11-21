const { expect } = require('chai');
const mongoConnect = require('../../../app/database/db');

describe('Database connection', () => {
	it('should able to create connection', (done) => {
		expect(mongoConnect());
		done();
	});
});