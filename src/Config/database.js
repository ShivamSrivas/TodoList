const mongoose = require('mongoose');

async function connectDB() {
  try {
    await mongoose.connect('Kindly give your url', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
  }
}

module.exports = connectDB;
