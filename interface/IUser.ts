import { Document } from 'mongoose';

export interface IUser extends Document {
  userId: string;
  memberId: string;
  name: string;
  address: string;
}
