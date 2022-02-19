const fs = require('fs');
const colors = require('colors');
const dotenv = require('dotenv');
const mongoose = require('mongoose')

dotenv.config({ path: './config/config.env' });

// Load Models
const Company = require('./models/Company');

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

// Import data into DB
const importData = async () => {
  try {
    await Company.create(companies);
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