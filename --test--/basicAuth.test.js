'use strict';


const server = require('../src/server');
const supertest = require('supertest');
const request = supertest(server.app);
const base64 = require('base-64');
// const jest=require('jest')
const { db } = require('../src/models/index');

beforeAll(async () => {
    await db.sync();
  });
  
  // after all the tests are done
  afterAll(async () => {
    await db.drop();
  });
  


describe('testing basic auth routes', () => {
  it('should respond with a user on POST /signup', async () => {
    const response = await request.post('/signup').send({
      username: 'haroun',
      password: 'test',
    });

    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('haroun');
  });

  it('should respond with a user on POST /signin with basic auth header', async () => {
    let authString = base64.encode('haroun:test');
    const response = await request.post('/signin').set('Authorization', `Basic ${authString}`);

    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('haroun');
  });
 
  
  it('Middleware basic Authentication ', async () => {
    const response = await request.post('/signin').set(
      'Authorization', ``
    );
    expect(response.status).toEqual(403);
    expect(response.body).toEqual({});
  });

});
