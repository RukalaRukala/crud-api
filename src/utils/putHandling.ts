import { IUser } from '../interfaces/data.interface';
import { data } from '../users/users';
import { IncomingMessage, ServerResponse } from 'http';
import path from 'path';
import { addChangesToUser } from './addChangesToUser';
import { validateId } from './validateId';
import { isInterfaceValid } from './isInterfaceValid';

export function putHandling(
  req: IncomingMessage,
  res: ServerResponse,
  url: string | undefined
) {
  const id = path.basename('./' + url);
  const userById = data.users.find(user => id === user.id);
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const newUser: IUser = { id, ...JSON.parse(body) };
    if (validateId(id, userById, res)) {
      if (isInterfaceValid(res, newUser)) {
        addChangesToUser(id, newUser, res);
      }
    }
  });
}
