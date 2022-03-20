const mongoose = require('mongoose')

const TourSchema = new mongoose.Schema({
  title: {
    type: String,
    trim: true,
    required: [true, 'Please add a course title']
  },
  description: {
    type: String,
    required: [true, 'Please add number of weeks']
  },
  maximumAltitude: {
    type: Number,
    required: [true, 'Please add the altitude of trek in ft']
  },
  days: {
    type: Number,
    required: [true, 'Please add number of days required to complete trek']
  },
  distance: {
    type: Number,
    required: [true, 'Please add trek distance in km']
  },
  cost: {
    type: Number, 
    required: [true, 'Please add cost of the trek in INR']
  },
  difficulty: {
    type: String,
    required: [true, 'Please add difficulty from Easy, Moderate, Hard, Extreme']
  }, 
  rewardCertificate: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  company: {
    type: mongoose.Schema.ObjectId,
    ref: 'Company',
    required: true
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true
  }
})

module.exports = mongoose.model('Tour', TourSchema)