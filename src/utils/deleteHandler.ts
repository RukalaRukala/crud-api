import { data } from '../users/users';
import { sendResponse } from './sendResponse';
import { ServerResponse } from 'http';
import { validateId } from './validateId';
import path from 'path';

export function deleteHandler(res: ServerResponse, url: string | undefined) {
  const id = path.basename('./' + url);
  const userById = data.users.find(user => id === user.id);
  if (validateId(id, userById, res)) {
    data.users = data.users.filter(item => item.id !== id);
    sendResponse(res, 204, null);
  }
}
