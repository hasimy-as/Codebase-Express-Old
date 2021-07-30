import { Request, Response } from 'express';

import { User } from '../models/User';
import { CODE } from '../../../../helpers/lib';
import { logError } from '../../../../helpers/lib/logger';

export default class UserQuery {
  public static async getUsers(req: Request, res: Response) {
    const ctx = 'users-getUsers';
    const user = await User.find();

    if (user) {
      return res.status(CODE.SUCCESS).json({
        status: 'success',
        data: user,
        message: 'Users successfully fetched',
        code: CODE.SUCCESS
      });
    }

    logError(ctx, 'Failed to fetch users', 'Users')
    return res.status(CODE.INTERNAL_ERROR).json({
      status: 'fail',
      data: [],
      message: 'Failed to fetch users!',
      code: CODE.INTERNAL_ERROR
    });
  }

  public static async getUserById(req: Request, res: Response) {
    const ctx = 'users-getUserById';
    const user = await User.findById({ _id: req.params._id });

    if (user) {
      return res.status(CODE.SUCCESS).json({
        status: 'success',
        data: user,
        message: 'User data successfully fetched',
        code: CODE.SUCCESS
      });
    }

    logError(ctx, 'Failed to fetch user data', 'Users')
    return res.status(CODE.INTERNAL_ERROR).json({
      status: 'fail',
      data: {},
      message: 'Failed to fetch user data!',
      code: CODE.INTERNAL_ERROR
    });
  }
}