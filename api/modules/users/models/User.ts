import { Schema, Model, model } from 'mongoose';

import { IUser } from '../../../../interface/IUser';

const userSchema: Schema = new Schema({
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
