import request from 'supertest';
import { server } from '../server/server';
import { data } from '../users/users';
import { IUser } from '../interfaces/data.interface';

describe('Get Tests', () => {
  afterAll(() => server.close());

  test('should get a 404 response from the server', async () => {
    const response = await request(server).get('/');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not Found');
  });

  test('should get a 200 response from the server', async () => {
    const response = await request(server).get('/api/users');
    expect(response.status).toBe(200);
  });

  test('should get a 200 response from the server with User', async () => {
    data.users.push({ id: 'b11e1111-11c1-1111-b1f1-1d1111a1bb11' } as IUser);
    const response = await request(server).get(
      '/api/users/b11e1111-11c1-1111-b1f1-1d1111a1bb11'
    );
    expect(response.status).toBe(200);
    expect(response.body.id).toBe('b11e1111-11c1-1111-b1f1-1d1111a1bb11');
    data.users.pop();
  });

  test('should get a 400 response from the server if id is invalid', async () => {
    const response = await request(server).get('/api/users/test');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('id is not valid');
  });

  test('should get a 404 response from the server if id does not exist', async () => {
    const response = await request(server).get(
      '/api/users/b11e1111-11c1-1111-b1f1-1d1111a1bb11'
    );
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('user with this ID does not exist');
  });
});
