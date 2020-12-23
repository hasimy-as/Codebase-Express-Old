const express = require('express');
const router = express.Router();
const mongoConnect = require('../database/db');
const UserController = require('../controllers/userSubController');

mongoConnect();
const user = new UserController();

router
	.get('/api/users', user.getUsers)
	.post('/api/users', user.createUser)
	.put('/api/users/:id', user.updateUser)
	.delete('/api/users/:id', user.deleteUser)
	.get('/api/users/:id', user.getOneUser);

module.exports = router;
