import request from 'supertest';
import { server } from '../server/server';
import { data } from '../users/users';

describe('DELETE Tests', () => {
  afterAll(() => server.close());

  test('should get a 404 response from the server', async () => {
    const response = await request(server).delete('/');
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('Not Found');
  });

  test('should get a 204 response from the server', async () => {
    data.users.push({
      id: 'b11e1111-11c1-1111-b1f1-1d1111a1bb11',
      name: 'test',
      age: 123,
      hobbies: ['test'],
    });
    const response = await request(server).delete(
      '/api/users/b11e1111-11c1-1111-b1f1-1d1111a1bb11'
    );
    expect(response.status).toBe(204);
    expect(data.users.at(-1)?.id).not.toBe(
      'b11e1111-11c1-1111-b1f1-1d1111a1bb11'
    );
  });

  test('should get a 400 response from the server if id is invalid', async () => {
    const response = await request(server).delete('/api/users/test1');
    expect(response.status).toBe(400);
    expect(response.body.error).toBe('id is not valid');
  });

  test('should get a 404 response from the server if id does not exist', async () => {
    const response = await request(server).delete(
      '/api/users/b11e1111-11c1-1111-b1f1-1d1111a1bb11'
    );
    expect(response.status).toBe(404);
    expect(response.body.error).toBe('user with this ID does not exist');
  });
});
