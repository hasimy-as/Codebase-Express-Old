
const sinon = require('sinon');
const assert = require('assert');

const { CODE } = require('../../../../app/lib/index');
const User = require('../../../../app/models/User');
const UserController = require('../../../../app/controllers/userSubController');

const user = new UserController();

let payloadCreate = {
	name: 'Park Shin-I',
	address: 'Seoul, South Korea',
};

let payloadOne = {
	name: 'Park Yoo-ra',
	address: 'Itaewon, South Korea',
};

describe('Unit controllers', () => {
	describe('Get methods', () => {
		it('successfully receive users from database', async () => {
			sinon.stub(User, 'find').resolves(payloadOne);
			const res = await user.getUsers(payloadOne);
			assert.equal(res.status, CODE.SUCCESS);
			assert.equal(res.message, 'data successfully fetched');
      assert.equal(res.data, payloadOne);
			User.find.restore();
		});

		it('should able to get a user', () => {
			let user = {};

			beforeEach(() => {
				user = payloa;
			});

			let userSchema = sinon.mock(User);

			userSchema
				.expects('fin')
				.withArgs({ _id: 11234 })
				.yields(null, user);

			User.fin({ _id: 11234 }, (err, result) => {
				userSchema.verify();
				userSchema.restore();
				expect(result).to.be.deep.equals(user);
			});

		});
	});

	describe('Post methods', () => {
		it('should able to create new user', () => {
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
			});
		});
	});

	describe('Update methods', () => {
		it('should able to update a user', () => {
			let userSchema = sinon.mock(new User(payloa));
			let user = userSchema.object;

			userSchema
				.expects('save')
				.withArgs({ _id: 11234 })
				.yields(null, 'user');

			user.save({ _id: 11234 }, (err, result) => {
				userSchema.verify();
				userSchema.restore();
			});
		});
	});

	describe('Delete methods', () => {
		it('should able to delete a user', () => {
			let userSchema = sinon.mock(new User(payloa));
			let user = userSchema.object;

			userSchema
				.expects('remove')
				.withArgs({ _id: 11234 })
				.yields(null, 'delete');

			user.remove({ _id: 11234 }, (err, result) => {
				userSchema.verify();
				userSchema.restore();
			});
		});
	});
});
