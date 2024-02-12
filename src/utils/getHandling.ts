import { sendResponse } from './sendResponse';
import { data } from '../users/users';
import { ServerResponse } from 'http';
import path from 'path';
import { validate as uuidValidate } from 'uuid';

export function getHandling(res: ServerResponse, url: string | undefined) {
  if (url === '/api/users') {
    sendResponse(res, 200, data.users);
  } else {
    const id = path.basename('./' + url);
    const userById = data.users.find(user => id === user.id);
    !uuidValidate(id)
      ? sendResponse(res, 400, { error: 'id is not valid' })
      : userById
        ? sendResponse(res, 200, userById)
        : sendResponse(res, 404, { error: 'user with this ID does not exist' });
  }
}
