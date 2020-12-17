const sinon = require('sinon');
const assert = require('assert');

const UserController = require('../../../../app/controllers/userSubController');
const { CODE } = require('../../../../app/lib/index');
const User = require('../../../../app/models/User');

const userApp = new UserController();

let payloadUsers;
let payloadEmpty;
let resIntErr;
let res;
let req;

describe('Unit controllers', () => {
	beforeEach(() => {
		payloadUsers = [
			{
				name: 'Developer',
				address: 'Indonesia',
			},
			{
				name: 'Maintainer',
				address: 'South Korea',
			},
		];
		payloadEmpty = [{}, {}];
		req = {
			params: { id: '5fd99e41366333a1751e4069' },
			body: {
				name: 'Park Yoo-ra',
				address: 'Itaewon, South Korea',
			},
		};
		res = {
			json: function () {},
			status: function (responseStatus) {
				assert.equal(responseStatus, CODE.SUCCESS);
				return this;
			},
		};
		resIntErr = {
			json: function () {},
			status: function (responseStatus) {
				assert.equal(responseStatus, CODE.INTERNAL_ERROR);
				return this;
			},
		};
	});

	describe('Get methods', () => {
		it('successfully receive users from database', () => {
			const req = {
				params: {},
			};
			sinon.stub(User, 'find').resolves(payloadUsers);
			userApp.getUsers(req, res);
			User.find.restore();
		});

		it('successfully receive users from database empty', () => {
			const req = {
				params: {},
			};
			sinon.stub(User, 'find').resolves(payloadEmpty);
			userApp.getUsers(req, res);
			User.find.restore();
		});

		it('error receive users from database', () => {
			const users = User.find(req.body);
			sinon.stub(users, 'find').resolves(users.errors === true);
			userApp.getUsers(req, resIntErr);
			users.find.restore();
		});

		it('should able to get a user', () => {
			sinon.stub(User, 'findById').resolves(req.body);
			userApp.getOneUser(req.params.id, res);
			User.findById.restore();
		});
	});

	describe('Post methods', () => {
		it('should able to create new user', () => {
			const data = new User(req.body);
			sinon.stub(data, 'save').resolves(req);
			userApp.createUser(req, res);
			data.save.restore();
		});
	});

	describe('Update methods', () => {
		it('should able to update a user', () => {
			const updateData = new User(req.body);
			sinon.stub(updateData, 'save').resolves(req);
			userApp.updateUser(req, res);
			updateData.save.restore();
		});
	});

	describe('Delete methods', () => {
		it('should able to delete a user', () => {
			const data = new User(req.body);
			sinon.stub(data, 'remove').resolves(req);
			userApp.deleteUser(req, res);
			data.remove.restore();
		});
	});
});
