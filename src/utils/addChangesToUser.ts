import { data } from '../users/users';
import { sendResponse } from './sendResponse';
import { IUser } from '../interfaces/data.interface';
import { ServerResponse } from 'http';

export function addChangesToUser(
  id: string | undefined,
  newUser: IUser,
  res: ServerResponse
) {
  data.users = data.users.map(item => (item.id === id ? newUser : item));
  sendResponse(res, 200, newUser);
}
