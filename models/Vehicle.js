const mongoose = require('mongoose')

const VehicleSchema = new mongoose.Schema({
  make: {
    type: String,
    required: [true, 'Make must be provided'],
    trim: true,
    maxlength: [20, 'Make length max 20 characters'],
  },
  model: {
    type: String,
    trim: true,
    maxlength: [20, 'Model name length max 20 characters'],
  },
  type: {
    type: String,
    trim: true,
    maxlength: [40, 'Type length max 40 characters'],
  },
})

module.exports = mongoose.model('Vehicle', VehicleSchema)
