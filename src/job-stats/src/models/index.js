import mongoose from 'mongoose';

import User from './users';
import Job from './jobs';

const db = () => {
  return mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});
};

const models = { User, Job };

export { db };

export default models;