const { expect } = require('chai');
const sinon = require('sinon');

const User = require('../../../../app/models/User');
const userSchema = new User();

describe('Unit db models', () => {
	it('should invalid if name or address is empty', (done) => {
		userSchema.validate((err) => {
			expect(err.name || err.address).to.exist;
			done();
		});
	});

	it(
		'should check for data with same name and address',
		sinon.stub(() => {
			this.stub(User, 'findOne');
			const data = {
				name: 'Park Shin-I',
				address: 'Seoul, South Korea',
			};

			sinon.assert.calledWith(User.findOne, data);
		}),
	);
});
