import express from 'express';

import { CommonRoutes } from '../../helpers/utils/common';

import UserQuery from '../modules/users/query/domain';
import UserProcess from '../modules/users/process/domain';

export class Routes extends CommonRoutes {
    constructor(app: express.Application) {
        super(app, 'UsersRoutes');
    }

    routes() {
        // Users
        this.app.route('/api/users').get(UserQuery.getUsers);
        this.app.route('/api/users/:userId').get(UserQuery.getUserById);
        this.app.route('/api/users').post(UserProcess.createUser);
        this.app.route('/api/users/:userId').put(UserProcess.updateUser);

        return this.app;
    }
}