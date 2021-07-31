import { v4 as uuid } from 'uuid';
import { Schema, Model, model } from 'mongoose';

import { IUser } from '../../../../interface/IUser';

const userSchema: Schema = new Schema({
  userId: {
    type: String,
    default: uuid()
  },
  memberId: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  address: {
    type: String,
    required: true
  },
});

export const User: Model<IUser> = model('User', userSchema);
