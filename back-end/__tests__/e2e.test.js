import dotenv from 'dotenv';
import { parse } from 'node-html-parser';
import request from 'supertest';
import mongoose from 'mongoose';
import app from '../app.js';

dotenv.config();

beforeAll(() => mongoose.connect(process.env.DB_URI));
afterAll(() => {
  // Closing the DB connection allows Jest to exit successfully.
  mongoose.connection.close();
});

describe('Generic e2e tests', () => {
  test("Test verifies that a stack trace HTML document is returned on error, regardless of whether it's operational or not.", async () => {
    const invalidPayload = {};
    const res = await request(app)
      .post('/api/user/register')
      .send(invalidPayload);

    // the only html that is returned by this server is a stack trace error document
    expect(res.header['content-type']).toBe('text/html; charset=utf-8');
    expect(res.statusCode).toBe(500);
    const root = parse(res.text);
    expect(root.querySelector('title').textContent).toMatch('Error');
  });
});
