const Vehicle = require('../models/Vehicle')

const getVehicles = async (req, res) => {
  const vehicles = await Vehicle.find({})
  res.status(200).json({ success: true, vehicles })
}

const createVehicle = async (req, res) => {
  const { make, model } = req.body
  if (!make || !model) {
    return res
      .status(400)
      .json({ success: false, msg: 'Both fields required' })
  }
  const type = Math.round(Math.random()) > 0 ? 'Van' : 'Passenger car'
  try {
    const vehicle = await Vehicle.create({ make, model, type })
    // * Alternative way for adding documents to mongodb:
    // * First create a new instance of the Model and then call .save() on it
    // * .create() calls .save() internally
    // * ----------------------------------
    // const vehicle = new Vehicle {
    //   make,
    //   model,
    //   type
    // }
    // vehicle.save()
    // * -----------------------------------
    res.status(201).send({ success: true, data: vehicle })
  } catch (error) {
    console.log(error)
  }
}

const getSingleVehicle = async (req, res) => {
  const { id } = req.params
  try {
    const vehicle = await Vehicle.findById(id)
    if (!vehicle) {
      return res
        .status(404)
        .json({ success: false, msg: `No vehicle found with id ${id}` })
    }
    return res.status(200).json({ success: true, data: vehicle })
  } catch (error) {
    console.log(error)
  }
}

const updateVehicle = async (req, res) => {
  const { id } = req.params
  const { type, make, model } = req.body
  try {
    const vehicle = await Vehicle.findById(id)
    if (!vehicle) {
      return res
        .status(404)
        .json({ success: false, msg: `No vehicle found with id ${id}` })
    }
    const updatedVehicle = await Vehicle.findByIdAndUpdate(id, { type, make, model })
    res.status(200).json({ success: true, data: updatedVehicle })
  } catch (error) {
    console.log(error)
  }
}

const deleteVehicle = async (req, res) => {
  const { id } = req.params
  try {
    const vehicle = await Vehicle.findById(id)
    if (!vehicle) {
      return res
        .status(404)
        .json({ success: false, msg: `No vehicle found with id ${id}` })
    }
    await Vehicle.findByIdAndRemove(id)
    return res.status(200).json({ success: true })
  } catch (error) {
    console.log(error)
  }
}

module.exports = {
  getVehicles,
  createVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle
}
