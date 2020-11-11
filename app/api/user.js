const express = require('express');
const router = express.Router();
const mongoConnect = require('../database/db');
const userController = require('../controllers/userSubController');

mongoConnect();

router
	.get('/api/users', userController.getUsers)
	.post('/api/users', userController.createUser)
	.put('/api/users/:id', userController.getUser, userController.updateUser)
	.delete('/api/users/:id', userController.getUser, userController.deleteUser)
	.get('/api/users/:id', userController.getUser, userController.getOneUser);

module.exports = router;
