const User = require('../models/User');
const { CODE } = require('../lib/index.js');

class UserController {
	getUsers = async (req, res, err) => {
		const users = await User.find();
		if (err) {
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
		res.status(CODE.SUCCESS).json({
			message: 'user has been fetched',
			data: res.user,
		});
	};

	createUser = async (req, res, err) => {
		const user = new User({
			name: req.body.name,
			address: req.body.address,
		});

		const newUser = await user.save();
		if (err) {
			res.status(CODE.BAD_REQUEST).json({
				message: err.message,
				data: null,
			});
		}

		res.status(CODE.CREATED).json({
			message: 'user successfully created',
			data: newUser,
		});
	};

	updateUser = async (req, res, err) => {
		if (req.body.name !== null) res.user.name = req.body.name;
		if (req.body.address !== null) res.user.address = req.body.address;

		const updatedUser = await res.user.save();
		if (err) {
			res.status(CODE.BAD_REQUEST).json({
				message: err.message,
				data: null,
			});
		}

		res.status(CODE.SUCCESS).json({
			message: 'user successfully updated',
			data: updatedUser,
		});
	};

	deleteUser = async (req, res, err) => {
		if (await res.user.remove()) {
			res.status(CODE.SUCCESS).json({
				message: 'user successfully removed',
				data: null,
			});
		} else if (err) {
			res.status(CODE.INTERNAL_ERROR).json({
				message: err.message,
				data: null,
			});
		}
	};

	getUser = async (req, res, next) => {
		let user;
		try {
			user = await User.findById(req.params.id);
			if (user === null)
				return res.status(CODE.NOT_FOUND).json({
					message: 'cannot find user',
					data: null,
				});
		} catch (err) {
			return res.status(CODE.INTERNAL_ERROR).json({
				message: err.message,
				data: null,
			});
		}

		res.user = user;
		next();
	};
}

module.exports = UserController;
