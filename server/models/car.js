const mongoose = require('mongoose');

const CarSchema = new mongoose.Schema({
  model: {
    type: String,
    required: true,
  },
  fuelType: {
    type: String,
    required: true,
  },
  transmission: {
    type: String,
    required: true,
  },
  dailyPrice: {
    type: Number,
    required: true,
  },
  deposit: {
    type: Number,
    required: true,
  },
  mileage: {
    type: Number,
    required: true,
  },
  minAge: {
    type: Number,
    required: true,
  },
  office: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Office', // Ofise bağlı
    required: true,
  },
  imageUrl: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Car', CarSchema);
