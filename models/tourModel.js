const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'A TOUR MUST HAVE A NAME'],
    unique: true,
    trim: true,
  },
  duration: {
    type: Number,
    required: [true, 'A TOUR MUST HAVE A DURATION'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'A TOUR MUST HAVE A GROUP SIZE'],
  },
  difficulty: {
    type: String,
    required: [true, 'A TOUR MUST HAVE A DIFFICULTY'],
  },
  ratingsAverage: {
    type: Number,
    default: 4.5,
  },
  ratingsQuantity: {
    type: Number,
    default: 0,
  },
  price: {
    type: Number,
    required: [true, 'A TOUR MUST HAVE A PRICE'],
  },
  priceDiscount: Number,
  summary: {
    type: String,
    trim: true,
    required: [true, 'A TOUR MUST HAVE A DESCRIPTION'],
  },
  description: {
    type: String,
    trim: true,
  },
  imageCover: {
    type: String,
    required: [true, 'A TOUR MUST HAVE A COVER IMAGE'],
  },
  images: [String],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  startDates: [Date],
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
