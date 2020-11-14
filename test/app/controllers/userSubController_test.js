const request = require('supertest');
const { CODE } = require('../../../app/lib/index');
const app = require('../../../server');

let payloadCreate = {
	name: 'Park Shin-I',
	address: 'Seoul, South Korea',
};

describe('Controllers', () => {
	it('should able to create new user', (done) => {
		request(app)
			.post('/api/users')
			.send(payloadCreate)
			.set('Accept', 'application/json')
			.expect('Content-Type', /json/)
			.expect(CODE.CREATED)
			.end(done);
	});
});
