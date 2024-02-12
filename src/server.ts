import { createServer, ServerResponse, IncomingMessage } from 'http';
import { v4 as uuidv4 } from 'uuid';
import { IUser } from './interfaces/data.interface';
import { data } from './users/users';
import { sendResponse } from './utils/sendResponse';
import { getHandling } from './utils/getHandling';

export const server = createServer(
  (req: IncomingMessage, res: ServerResponse) => {
    const { method, url } = req;

    if (method === 'GET' && url?.startsWith('/api/users')) {
      getHandling(res, url);
    } else if (method === 'POST' && url === '/api/users') {
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const newUser: IUser = { id: uuidv4(), ...JSON.parse(body) };
        data.users.push(newUser);
        sendResponse(res, 201, newUser);
      });
    } else if (method === 'PUT' && url?.startsWith('/api/users/')) {
      const id = url.slice(10); // Удаляем "/api/data/" из URL
      let body = '';
      req.on('data', chunk => {
        body += chunk.toString();
      });
      req.on('end', () => {
        const newUser: IUser = { ...JSON.parse(body), id };
        data.users = data.users.map(item => (item.id === id ? newUser : item));
        sendResponse(res, 200, newUser);
      });
    } else if (method === 'DELETE' && url?.startsWith('/api/users/')) {
      const id = url.slice(10); // Удаляем "/api/data/" из URL
      data.users = data.users.filter(item => item.id !== id);
      sendResponse(res, 204, null);
    } else {
      sendResponse(res, 404, { error: 'Not Found' });
    }
  }
);
