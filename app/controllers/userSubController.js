const User = require('../models/User');
const { STATUS, CODE } = require('../lib/index.js');

exports.getUsers = async (req, res) => {
	try {
		const users = await User.find();
		res.json({
			status: STATUS.SUCCESS,
			message: 'data successfully fetched',
			data: users,
			code: CODE.SUCCESS,
		});
	} catch (err) {
		res.json({
			status: STATUS.INTERNAL_ERROR,
			message: err.message,
			data: null,
			code: CODE.INTERNAL_ERROR,
		});
	}
};

exports.getOneUser = async (req, res) => {
	res.json({
		status: STATUS.SUCCESS,
		message: 'user has been fetched',
		data: res.user,
		code: CODE.SUCCESS,
	});
};

exports.createUser = async (req, res) => {
	const user = new User({
		name: req.body.name,
		address: req.body.address,
	});
	try {
		const newUser = await user.save();
		res.json({
			status: STATUS.CREATED,
			message: 'user successfully created',
			data: newUser,
			code: CODE.CREATED,
		});
	} catch (err) {
		res.json({
			status: STATUS.BAD_REQUEST,
			message: err.message,
			data: null,
			code: CODE.BAD_REQUEST,
		});
	}
};

exports.updateUser = async (req, res) => {
	if (req.body.name !== null) res.user.name = req.body.name;
	if (req.body.address !== null) res.user.address = req.body.address;
	try {
		const updatedUser = await res.user.save();
		res.json({
			status: STATUS.SUCCESS,
			message: 'user successfully updated',
			data: updatedUser,
			code: CODE.SUCCESS,
		});
	} catch (err) {
		res.json({
			status: STATUS.BAD_REQUEST,
			message: err.message,
			data: null,
			code: CODE.BAD_REQUEST,
		});
	}
};

exports.deleteUser = async (req, res) => {
	try {
		await res.user.remove();
		res.json({
			status: STATUS.SUCCESS,
			message: 'user successfully removed',
			data: null,
			code: CODE.SUCCESS,
		});
	} catch (err) {
		res.json({
			status: STATUS.INTERNAL_ERROR,
			message: err.message,
			data: null,
			code: CODE.INTERNAL_ERROR,
		});
	}
};

exports.getUser = async (req, res, next) => {
	let user;
	try {
		user = await User.findById(req.params.id);
		if (user === null)
			return res.json({
				status: STATUS.NOT_FOUND,
				message: 'cannot find user',
				data: null,
				code: CODE.NOT_FOUND,
			});
	} catch (err) {
		return res.json({
			status: STATUS.INTERNAL_ERROR,
			message: err.message,
			data: null,
			code: CODE.INTERNAL_ERROR,
		});
	}

	res.user = user;
	next();
};
