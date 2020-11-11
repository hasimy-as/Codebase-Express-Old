const request = require('supertest');
const { CODE } = require('../app/lib/index');
const app = require('../server');

describe('Main server', () => {
	it('should return success code in accessing root', (done) => {
		request(app)
			.get('/')
			.expect(CODE.SUCCESS)
			.end(done);
	});

	it('should fail if access unspecified endpoint', (done) => {
		request(app)
			.get('/hello-world')
			.expect(CODE.NOT_FOUND)
			.end(done);
	});
});
