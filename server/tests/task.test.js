const request = require('supertest');
const app = require('../app'); // Your Express app
const mongoose = require('mongoose');


let token;
let taskId;

beforeAll(async () => {
  
    await mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });

  // Create a user and get a token for authentication
  await request(app).post('/api/auth/register').send({
    firstName: 'John',
    lastName: 'Doe',
    email: 'johndoe@gmail.com',
    password: 'password123'
  });

  const res = await request(app).post('/api/auth/login').send({
    email: 'johndoe@gmail.com',
    password: 'password123'
  });
  console.log("res",res.body.token);
  token = res.body.token;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
});

describe('Task API', () => {
  it('should create a new task', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'New Task',
        description: 'Task description',
        status: 'Pending',
      });

    expect(res.statusCode).toEqual(201);
    expect(res.body.title).toEqual('New Task');
    taskId = res.body._id; // Save task ID for further tests
  });

  it('should return validation errors when creating a task with invalid data', async () => {
    const res = await request(app)
      .post('/api/tasks')
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: '',
        status: ''
      });

    expect(res.statusCode).toEqual(400);
    expect(res.body.errors).toHaveLength(2); // 2 validation errors (title and status)
  });

  it('should get all tasks', async () => {
    const res = await request(app)
      .get('/api/tasks')
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toBeInstanceOf(Array);
    
  });

  it('should update an existing task', async () => {
    const res = await request(app)
      .put(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`)
      .send({
        title: 'Updated Task Title',
        description: 'Updated description',
        status: 'Completed'
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body.title).toEqual('Updated Task Title');
    expect(res.body.status).toEqual('Completed');
  });

  it('should delete a task', async () => {
    const res = await request(app)
      .delete(`/api/tasks/${taskId}`)
      .set('Authorization', `Bearer ${token}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body.message).toEqual('Task deleted successfully');
  });
});
