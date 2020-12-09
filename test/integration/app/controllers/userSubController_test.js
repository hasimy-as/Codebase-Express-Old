const request = require('supertest');

const app = require('../../../../server');
const { CODE } = require('../../../../app/lib/index');

describe('Integration controllers', () => {
	describe('Get methods', () => {
		it('should able to get all user', (done) => {
			request(app)
				.get('/api/users')
				.expect('Content-Type', /json/)
				.expect(CODE.SUCCESS)
				.end(done);
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
});
