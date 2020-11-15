const { expect } = require('chai');

const User = require('../../../app/models/User');
const userSchema = new User();

describe('Database models', () => {
	it('should invalid if name or address is empty', (done) => {
		userSchema.validate((err) => {
			expect(err.errors.name || err.errors.address).to.exist;
			done();
		});
	});
});
