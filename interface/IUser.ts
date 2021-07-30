import { Document } from 'mongoose';

export interface IUser extends Document {
  memberId: string;
  name: string;
  address: string;
}
