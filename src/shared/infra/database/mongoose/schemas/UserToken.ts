import mongoose from 'mongoose';

interface IUserTokenSchema {
  user_id: string;
  refresh_token: string;
}

const userTokenSchema = new mongoose.Schema<IUserTokenSchema>(
  {
    user_id: { type: String, required: true },
    refresh_token: { type: String, required: true },
  },
  { timestamps: false, collection: 'user_token' }
);

const UserToken = mongoose.model<IUserTokenSchema>('UserToken', userTokenSchema);

export default UserToken;
