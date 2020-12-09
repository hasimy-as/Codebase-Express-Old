const { expect } = require('chai');
const mongoConnect = require('../../../../app/database/db');

describe('Unit database', () => {
	it('should able to create connection', (done) => {
		expect(mongoConnect());
		done();
	});
});