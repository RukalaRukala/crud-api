import { sendResponse } from './sendResponse';
import { data } from '../users/users';
import { ServerResponse } from 'http';
import path from 'path';
import { validateId } from './validateId';

export function getHandling(res: ServerResponse, url: string | undefined) {
  if (url === '/api/users') {
    sendResponse(res, 200, data.users);
  } else {
    const id = path.basename('./' + url);
    const userById = data.users.find(user => id === user.id);
    if (validateId(id, userById, res)) {
      sendResponse(res, 200, userById || null);
    }
  }
}
