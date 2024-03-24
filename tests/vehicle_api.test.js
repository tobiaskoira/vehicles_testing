const mongoose = require('mongoose')
const supertest = require('supertest')
const Vehicle = require('../models/Vehicle')
const testVehicles = require('./data.json')
const app = require('../app')
const api = supertest(app)

beforeEach(async () => {
  await Vehicle.deleteMany({})
  await Vehicle.create(testVehicles)
})

test('vehicles returned as json', async () => {
  await api
    .get('/api/vehicles')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('a new vehicle can be added ', async () => {
  const newVehicle = {
    'make':'Hyundai',
    'model':'Kona'
  }

  await api
    .post('/api/vehicles')
    .send(newVehicle)
    .expect(201)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/vehicles')
  expect(response.body.vehicles).toHaveLength(testVehicles.length + 1)
})

afterAll(() => {
  mongoose.connection.close()
})