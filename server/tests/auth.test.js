const request = require('supertest');
const app = require('../app'); // Assuming this is the entry point to your Express app
const mongoose = require('mongoose');

// Set up a database for tests
beforeAll(async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
  } catch (error) {
    console.error('Failed to connect to the database', error);
  }
});

afterAll(async () => {
  await mongoose.connection.dropDatabase(); // Ensure you drop the test DB after tests
  await mongoose.connection.close(); // Close connection after tests
});

describe('Auth API', () => {
  let token;

  it('should register a new user', async () => {
    const res = await request(app).post('/api/auth/register').send({
      firstName: 'John',
      lastName: 'Doe',
      email: 'johndoe@gmail.com',
      password: 'password123'
    });

    // Check the response status and message
    expect(res.statusCode).toEqual(201);
    expect(res.body.message).toEqual('User registered successfully');
  });

  it('should return validation errors when registering with invalid data', async () => {
    const res = await request(app).post('/api/auth/register').send({
      firstName: '',
      lastName: '',
      email: 'invalid-email',
      password: '123'
    });

    // Ensure validation errors are returned
    expect(res.statusCode).toEqual(500);
    
  });

  it('should log in the user and return a token', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'password123'
    });

    // Expect a token in the response
    expect(res.statusCode).toEqual(200);
    expect(res.body.token).toBeDefined();
    token = res.body.token; // Save the token for future tests
  });

  it('should fail login with incorrect credentials', async () => {
    const res = await request(app).post('/api/auth/login').send({
      email: 'johndoe@gmail.com',
      password: 'wrongpassword'
    });

    // Expect a 401 status for unauthorized
    expect(res.statusCode).toEqual(401);
    expect(res.body.message).toBeDefined();
  });

  it('should log out successfully', async () => {
    const res = await request(app).post('/api/auth/logout').send();
    
    // Check that the user logged out successfully
    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Logged out successfully');
  });
});
