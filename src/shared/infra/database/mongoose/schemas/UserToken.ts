import mongoose from 'mongoose';
import { DateUtils } from '../../../../utils/DateUtils';

interface IUserTokenSchema {
  user_id: string;
  refresh_token: string;
  expires_at: Date;
}

const userTokenSchema = new mongoose.Schema<IUserTokenSchema>(
  {
    user_id: { type: String, required: true },
    refresh_token: { type: String, required: true },
    expires_at: { type: Date, required: true, default: DateUtils.addDays(new Date(), 30) },
  },
  { timestamps: false, collection: 'user_token' }
);

const UserToken = mongoose.model<IUserTokenSchema>('UserToken', userTokenSchema);

export default UserToken;
