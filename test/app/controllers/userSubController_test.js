const request = require('supertest');
const sinon = require('sinon');
const { expect } = require('chai');

const { CODE } = require('../../../app/lib/index');
const User = require('../../../app/models/User');
const app = require('../../../server');

let payloadCreate = {
	name: 'Park Shin-I',
	address: 'Seoul, South Korea',
};

describe('Controllers', () => {
	describe('Get methods', () => {
		it('should able to get all user', (done) => {
			request(app)
				.get('/api/users')
				.expect('Content-Type', /json/)
				.expect(CODE.SUCCESS)
				.end(done);
		});

		it('successfully receive users from database', (done) => {
			let userSchema = sinon.mock(User);
			let expectedResult = [];

			userSchema.expects('find').yields(null, expectedResult);

			User.find((err, result) => {
				userSchema.verify();
				userSchema.restore();
				expect(result).to.be.an('array').empty;

				done();
			});
		});

		/**
		 * @info
		 * The ID parameter below must be changed to an
		 * ID of an existing data in your database
		 * */
		it('should able to get a single user', (done) => {
			request(app)
				.get('/api/users/:id') // Change the ID here
				.expect('Content-Type', /json/)
				.expect(CODE.SUCCESS)
				.end(done);
		});
	});

	describe('Post methods', () => {
		it('should able to create new user', (done) => {
			var user = new User(payloadCreate);

			var req = { body: { name: 'name', address: 'address' } };
			var res = {};

			var userSchema = sinon.mock(user);
			var user = userSchema.object;

			userSchema.expects('save').yields(null, user);

			user.save({ req: req, res: res }, (err, result) => {
				userSchema.verify();
				userSchema.restore();
				expect(result).to.be.equal(user);
				expect(CODE.SUCCESS);
				done();
			});
		});
	});

	describe.skip('Update methods', () => {

	});

	describe.skip('Delete methods', () => {

	});
});
