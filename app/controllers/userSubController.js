const User = require('../models/User');
const logger = require('../lib/logger');
const { CODE } = require('../lib/index.js');

class UserController {
	getUsers = async (req, res) => {
		const users = await User.find();
		if (users.err) {
			logger.log('app-err', 'Application error', users.err);
			res.status(CODE.INTERNAL_ERROR).json({
				message: err.message,
				data: null,
			});
		}
		res.status(CODE.SUCCESS).json({
			message: 'Success fetching users',
			data: users,
		});
	};

	getOneUser = async (req, res) => {
		let userId = req.params.id;
		let user = await User.findById(userId);
		if (user === null) {
			return res.status(CODE.NOT_FOUND).json({
				message: 'User not found',
				data: null,
			});
		}
		res.status(CODE.SUCCESS).json({
			message: 'User has been fetched',
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
			logger.log('app-err', 'Error creating user', createUser.err);
			res.status(CODE.BAD_REQUEST).json({
				message: err.message,
				data: null,
			});
		}
		res.status(CODE.CREATED).json({
			message: 'User successfully created',
			data: createUser,
		});
	};

	updateUser = async (req, res) => {
		let userId = req.params.id;
		let user = await User.findById(userId);
		if (user === null) {
			return res.status(CODE.NOT_FOUND).json({
				message: 'User not found',
				data: null,
			});
		}

		user = {
			name: req.body.name,
			address: req.body.address,
		};

		const updateUser = await User.findByIdAndUpdate(userId, user);
		if (updateUser.err) {
			logger.log('app-err', 'Error updating user', updateUser.err);
			res.status(CODE.BAD_REQUEST).json({
				message: err.message,
				data: null,
			});
		}
		res.status(CODE.SUCCESS).json({
			message: `User ${userId} successfully updated`,
			data: user,
		});
	};

	deleteUser = async (req, res) => {
		let userId = req.params.id;
		let user = await User.findById(userId);
		if (user === null)
			return res.status(CODE.NOT_FOUND).json({
				message: 'User not found',
				data: null,
			});

		const deleteUser = await User.findByIdAndDelete(userId, user);
		if (deleteUser) {
			res.status(CODE.SUCCESS).json({
				message: 'User successfully removed',
				data: null,
			});
		}
	};
}

module.exports = UserController;
