import { v4 as uuid } from 'uuid';
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
        status: 'fail',
        data: {},
        message: 'Member ID already registered!',
        code: CODE.INTERNAL_ERROR
      });
    }

    const data = await User.create({ userId: uuid(), ...body });
    if (data) {
      return res.status(CODE.SUCCESS).json({
        status: 'success',
        data: data,
        message: 'User has been created',
        code: CODE.SUCCESS
      });
    }

    logError(ctx, 'Failed to create users', 'Users')
    return res.status(CODE.INTERNAL_ERROR).json({
      status: 'fail',
      data: {},
      message: 'Failed to create users!',
      code: CODE.INTERNAL_ERROR
    });
  }

  public static async updateUser(req: Request, res: Response) {
    const ctx = 'users-updateUser';
    const { ...body } = req.body;
    const user = await User.findOne({ userId: req.params.userId });

    if (user) {
      const result = await User.updateOne({ userId: req.params.userId, ...body });
      if (result) {
        return res.status(CODE.SUCCESS).json({
          status: 'success',
          data: result,
          message: 'User has been updated',
          code: CODE.SUCCESS
        });
      }

      logError(ctx, 'Failed to update existing user', 'Users')
      return res.status(CODE.INTERNAL_ERROR).json({
        status: 'fail',
        data: {},
        message: 'Failed to update existing user!',
        code: CODE.INTERNAL_ERROR
      });
    }

    logError(ctx, 'User not found', 'Users')
      return res.status(CODE.NOT_FOUND).json({
        status: 'fail',
        data: {},
        message: 'User not found!',
        code: CODE.NOT_FOUND
      });
  }

  public static async deleteUser(req: Request, res: Response) {
    const ctx = 'users-deleteUser';
    const user = await User.findOne({ userId: req.params.userId });

    if (user) {
      const result = await User.deleteOne({ userId: req.params.userId });
      if (result) {
        return res.status(CODE.SUCCESS).json({
          status: 'success',
          data: result,
          message: 'User has been deleted',
          code: CODE.SUCCESS
        });
      }

      logError(ctx, 'Failed to delete user', 'Users')
      return res.status(CODE.INTERNAL_ERROR).json({
        status: 'fail',
        data: {},
        message: 'Failed to delete existing user!',
        code: CODE.INTERNAL_ERROR
      });
    }

    logError(ctx, 'User not found', 'Users')
      return res.status(CODE.NOT_FOUND).json({
        status: 'fail',
        data: {},
        message: 'User not found!',
        code: CODE.NOT_FOUND
      });
  }
}