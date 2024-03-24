const express = require('express')
const router = express.Router()

const {
  getVehicles,
  createVehicle,
  getSingleVehicle,
  updateVehicle,
  deleteVehicle,
} = require('../controllers/vehicles')

router.get('/', getVehicles)
router.post('/', createVehicle)
router.get('/:id', getSingleVehicle)
router.put('/:id', updateVehicle)
router.delete('/:id', deleteVehicle)

// The above could also be represented
// router.route('/').get(getVehicles).post(createVehicle)
// router.route('/:id').put(updateVehicle).delete(deleteVehicle)

module.exports = router
