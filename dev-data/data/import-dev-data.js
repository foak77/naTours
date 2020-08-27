const fs = require('fs');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Tour = require('./../../models/tourModel');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE_LOCAL;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('DB CONNECTION SUCCESS');
  });

//read JSON file
const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8')
);

//import DATA in DB
const importData = async () => {
  try {
    await Tour.create(tours);
    console.log('DATA LOADED SUCCESSFULLY');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

//delete all DATA from DB
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    console.log('DATA DELETED SUCCESSFULLY');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}

console.log(process.argv);