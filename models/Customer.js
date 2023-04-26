import mongoose from 'mongoose';

const CustomerSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },

  email: {
    type: String,
    required: true,
    trim: true,
  },

  balance: {
    type: Number,
    default: 0,
  },
});

const Customer = mongoose.model('Customer', CustomerSchema);

export default Customer;
