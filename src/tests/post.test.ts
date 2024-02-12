import request from 'supertest';
import { server } from '../server/server';
import { IUserUnknown } from '../interfaces/data.interface';
import { data } from '../users/users';

describe('POST Tests', () => {
  afterAll(() => server.close());

  test('should get a 404 response from the server', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not Found');
  });

  test('should get a 201 response from the server', async () => {
    const user: IUserUnknown = {
      id: 'b11e1111-11c1-1111-b1f1-1d1111a1bb11',
      name: 'Anatoly',
      age: 21,
      hobbies: ['strike ball'],
    };
    const response = await request(server).post('/api/users').send(user);
    expect(response.status).toBe(201);
    expect(response.header['content-type']).toMatch(/application\/json/);
    expect(response.header['connection']).toBe('close');
    expect(data.users.at(-1)?.id).toBe('b11e1111-11c1-1111-b1f1-1d1111a1bb11');
    data.users.pop();
  });

  test('should get a 400 response from the server if user does not contain require props', async () => {
    const user = {
      id: 'b11e1111-11c1-1111-b1f1-1d1111a1bb11',
      name: 'test',
      hobbies: ['test'],
    } as IUserUnknown;
    const response = await request(server).post('/api/users').send(user);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe("user doesn't contain required fields");
    expect(data.users.at(-1)?.id).not.toBe(
      'b11e1111-11c1-1111-b1f1-1d1111a1bb11'
    );
  });

  test('should get a 400 response from the server if user props are invalid', async () => {
    const user = {
      id: 'b11e1111-11c1-1111-b1f1-1d1111a1bb11',
      age: '12',
      name: 123,
      hobbies: ['test'],
    } as IUserUnknown;
    const response = await request(server).post('/api/users').send(user);
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('the values of the wrong type');
  });
});
