const request = require('supertest');
const { CODE } = require('../../../app/lib/index');
const app = require('../../../server');

let payloadCreate = {
	name: 'Park Shin-I',
	address: 'Seoul, South Korea',
};

describe('Controllers', () => {
	it('should able to get all user', (done) => {
		request(app)
			.get('/api/users')
			.expect('Content-Type', /json/)
			.expect(CODE.SUCCESS)
			.end(done);
	});

	it('should able to create new user', (done) => {
		request(app)
			.post('/api/users')
			.send(payloadCreate)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(CODE.CREATED)
			.end(done);
	});

	/** 
	 * @info
	 * The ID parameter below must be changed to an 
	 * ID of an existing data in your database 
	 * */
	it('should able to get a single user', (done) => {
		request(app)
			.get('/api/users/5fa57df98ccd0415cf489d9c')
			.expect('Content-Type', /json/)
			.expect(CODE.SUCCESS)
			.end(done);
	});
});
