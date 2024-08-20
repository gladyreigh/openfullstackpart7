const request = require('supertest')
const mongoose = require('mongoose')
const app = require('../index')
const User = require('../models/user')

beforeEach(async () => {
  await User.deleteMany({})
})

describe('User API tests', () => {
  test('should create a new user with valid data', async () => {
    const newUser = {
      username: 'validuser',
      name: 'Valid User',
      password: 'validpassword'
    }

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    expect(response.body.username).toBe('validuser')
    expect(response.body.name).toBe('Valid User')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(1)
  })

  test('should not create user with short username', async () => {
    const newUser = {
      username: 'us',
      name: 'Short User',
      password: 'validpassword'
    }

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBe('Username must be at least 3 characters long')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(0)
  })

  test('should not create user with short password', async () => {
    const newUser = {
      username: 'validuser',
      name: 'Valid User',
      password: 'pw'
    }

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toBe('Password must be at least 3 characters long')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(0)
  })

  test('should not create user with duplicate username', async () => {
    const newUser = {
      username: 'duplicateuser',
      name: 'Duplicate User',
      password: 'validpassword'
    }

    await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const response = await request(app)
      .post('/api/users')
      .send(newUser)
      .expect(400)
      .expect('Content-Type', /application\/json/)

    expect(response.body.error).toContain('expected `username` to be unique')

    const usersAtEnd = await User.find({})
    expect(usersAtEnd).toHaveLength(1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})
