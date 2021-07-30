import { Request, Response } from 'express';

import { User } from '../models/User';
import { CODE } from '../../../../helpers/lib';
import { logError } from '../../../../helpers/lib/logger';

export default class UserProcess {
  public static async createUser(req: Request, res: Response) {
    const ctx = 'users-createUser';
    const { ...body } = req.body;
    const user = await User.findOne({ memberId: body.memberId });

    if (user) {
      logError(ctx, 'Member ID already registered', 'Users')
      return res.status(CODE.INTERNAL_ERROR).json({
        success: false,
        data: {},
        message: 'Member ID already registered!',
        code: CODE.INTERNAL_ERROR
      });
    }

    const data = await User.create(body);
    if (data) {
      return res.status(CODE.SUCCESS).json({
        success: true,
        data: data,
        message: 'User has been created',
        code: CODE.INTERNAL_ERROR
      });
    }

    logError(ctx, 'Failed to create users', 'Users')
    return res.status(CODE.INTERNAL_ERROR).json({
      success: false,
      data: {},
      message: 'Failed to create users!',
      code: CODE.INTERNAL_ERROR
    });
  }
}