const User = require('../models/User');
const { CODE } = require('../lib/index.js');

class UserController {
	getUsers = async (req, res) => {
		const users = await User.find();
		if (users.err) {
			res.status(CODE.INTERNAL_ERROR).json({
				message: err.message,
				data: null,
			});
		}
		res.status(CODE.SUCCESS).json({
			message: 'data successfully fetched',
			data: users,
		});
	};

	getOneUser = async (req, res) => {
		let userId = req.params.id;
		let user = await User.findById(userId);
		if (user === null) {
			return res.status(CODE.NOT_FOUND).json({
				message: 'cannot find user',
				data: null,
			});
		}
		res.status(CODE.SUCCESS).json({
			message: 'user has been fetched',
			data: user,
		});
	};

	createUser = async (req, res) => {
		const user = {
			name: req.body.name,
			address: req.body.address,
		};

		const createUser = await User.create(user);
		if (createUser.err) {
			res.status(CODE.BAD_REQUEST).json({
				message: err.message,
				data: null,
			});
		}
		res.status(CODE.CREATED).json({
			message: 'user successfully created',
			data: createUser,
		});
	};

	updateUser = async (req, res) => {
		let userId = req.params.id;
		let user = await User.findById(userId);
		if (user === null) {
			return res.status(CODE.NOT_FOUND).json({
				message: 'cannot find user',
				data: null,
			});
		}

		user = {
			name: req.body.name,
			address: req.body.address,
		};

		const updateUser = await User.findByIdAndUpdate(userId, user);
		if (updateUser.err) {
			res.status(CODE.BAD_REQUEST).json({
				message: err.message,
				data: null,
			});
		}
		res.status(CODE.SUCCESS).json({
			message: `user ${userId} has successfully updated`,
			data: user,
		});
	};

	deleteUser = async (req, res) => {
		let userId = req.params.id;
		let user = await User.findById(userId);
		if (user === null)
			return res.status(CODE.NOT_FOUND).json({
				message: 'cannot find user',
				data: null,
			});

		const deleteUser = await User.findByIdAndDelete(userId, user);
		if (deleteUser) {
			res.status(CODE.SUCCESS).json({
				message: 'user successfully removed',
				data: null,
			});
		}
	};
}

module.exports = UserController;
