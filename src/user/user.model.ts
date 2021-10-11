import * as mongoose from 'mongoose';
import User from './user.interface';

const userSchema = new mongoose.Schema(
  {
    name: String,
    hobbies: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: 'Hobby',
      default: [],
    },
  },
);

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;
