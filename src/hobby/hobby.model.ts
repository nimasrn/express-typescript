import * as mongoose from 'mongoose';
import Post from './hobby.interface';

const postSchema = new mongoose.Schema({
  passionLevel: String,
  name: String,
  year: Number,
});

const postModel = mongoose.model<Post & mongoose.Document>('Hobby', postSchema);

export default postModel;
