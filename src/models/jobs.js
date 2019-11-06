import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
  company: {
    type: String,
    required: true
  },
  position: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true,
    // city: {
    //   type: String,
    //   required: true
    // },
    // state: {
    //   type: String,
    //   required: true
    // },
  },
  date: {
    type: Date,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
  },
  applicationUrl: {
    type: String,
    required: false,
  },
  notes: {
    type: String,
    required: false,
  },
  logo: {
    type: String,
    required: false
  }
});
const Job = mongoose.model('Jobs', jobSchema);

export default Job;