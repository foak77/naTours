const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');

const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'A TOUR MUST HAVE A NAME'],
      unique: true,
      trim: true,
      maxlength: [
        40,
        'A TOUR NAME MUST HAVE LESS OR EQUAL THEN 40 CHARACTERES',
      ],
      minlength: [
        10,
        'A TOUR NAME MUST HAVE MORE OR EQUAL THEN 10 CHARACTERES',
      ],
      // validate: [validator.isAlpha, 'TOUR NAME MUST ONLY CONTAIN CHARACTERS'],
    },
    slug: String,
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
      enum: {
        values: ['easy', 'medium', 'difficult'],
        message: 'DIFFICULTY IS EITHER: EASY, MEDIUM, DIFFICULT',
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, 'RATING MUST BE ABOVE 1'],
      max: [5, 'RATING MUST BE BELOW 5'],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      type: Number,
      required: [true, 'A TOUR MUST HAVE A PRICE'],
    },
    priceDiscount: {
      type: Number,
      validate: {
        validator: function (val) {
          // THIS ONLY POINT TO CURRENT NEW CREATION
          return val < this.price;
        },
        message: 'DICOUNT PRICE ({VALUE}) SHOULD BE BELOW THE REGULAR PRICE',
      },
    },
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
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

tourSchema.virtual('durationWeeks').get(function () {
  return this.duration / 7;
});

//document middleware: run before the save() and the create()
tourSchema.pre('save', function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre('save', function (next) {
//   console.log('WILL SAVE DOCUMENT');
//   next();
// });

// tourSchema.post('save', function (doc, next) {
//   console.log(doc);
//   next();
// });

// query middleware
// tourSchema.pre('find', function (next) {
tourSchema.pre(/^find/, function (next) {
  this.find({ secretTour: { $ne: true } });

  this.start = Date.now();
  next();
});

tourSchema.post(/^find/, function (docs, next) {
  console.log(`QUERY TOOK ${Date.now() - this.start} MILISECONDS`);
  next();
});

// agregation middleware
tourSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
  next();
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
