// const request = require('supertest');
const request = require('supertest')
const { CODE } = require('../../../app/lib/index');
// const User = require('../../../app/database/db');
const app = require('../../../server');

let payloadCreate = {
		// _id: "5faf7599ec0d708877431b1c",
	  name: "Park Shin-I",
		address: "Seoul, South Korea",
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
