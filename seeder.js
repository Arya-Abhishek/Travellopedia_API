const fs = require('fs');
const colors = require('colors');
const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config({ path: './config/config.env' });

// Load Models
const Company = require('./models/Company');
const Tour = require('./models/Tour');
const User = require('./models/User')

// Connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('db connected successfully!'.green.bold)
  })
  .catch(err => {
    console.log(err)
  });

// Read JSON files
const companies = JSON.parse(fs.readFileSync(`${__dirname}/_data/companies.json`, 'utf-8'))
const tours = JSON.parse(fs.readFileSync(`${__dirname}/_data/tours.json`, 'utf-8'))
const users = JSON.parse(fs.readFileSync(`${__dirname}/_data/users.json`, 'utf-8'))

// Import data into DB
const importData = async () => {
  try {
    await Company.create(companies);
    await Tour.create(tours);
    await User.create(users);
    console.log('Data imported successfully...'.green.inverse)
    process.exit()
  } catch (err) {
    console.log(err);
  }
}

// Delete data
const deleteData = async () => {
  try {
    await Company.deleteMany();
    await Tour.deleteMany();
    await User.deleteMany();
    console.log('Data deleted successfully...'.red.inverse)
    process.exit()
  } catch (err) {
    console.log(err);
  }
}

// Call import or delete based upon args 
if (process.argv[2] === '-i') {
  importData();
} else if (process.argv[2] === '-d') {
  deleteData();
}