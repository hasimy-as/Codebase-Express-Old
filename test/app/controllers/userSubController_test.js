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

let payloadOne = {
	name: 'Park Yoo-ra',
	address: 'Itaewon, South Korea',
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

		it('should able to get a user', (done) => {
			let user = {};

			beforeEach(() => {
				user = payloadOne;
			});

			let userSchema = sinon.mock(User);

			userSchema
				.expects('findOne')
				.withArgs({ _id: 11234 })
				.yields(null, user);

			User.findOne({ _id: 11234 }, (err, result) => {
				userSchema.verify();
				userSchema.restore();
				expect(result).to.be.deep.equals(user);
			});

			done();
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

	describe('Update methods', () => {
		it('should able to update a user', (done) => {
			let userSchema = sinon.mock(new User(payloadOne));
			let user = userSchema.object;

			userSchema
				.expects('save')
				.withArgs({ _id: 11234 })
				.yields(null, 'user');

			user.save({ _id: 11234 }, (err, result) => {
				userSchema.verify();
				userSchema.restore();
				done();
			});
		});
	});

	describe('Delete methods', () => {
		it('should able to delete a user', (done) => {
			let userSchema = sinon.mock(new User(payloadOne));
			let user = userSchema.object;

			userSchema
				.expects('remove')
				.withArgs({ _id: 11234 })
				.yields(null, 'delete');

			user.remove({ _id: 11234 }, (err, result) => {
				userSchema.verify();
				userSchema.restore();
				done();
			});
		});
	});
});
