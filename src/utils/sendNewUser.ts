import { data } from '../users/users';
import { sendResponse } from './sendResponse';
import { IUser } from '../interfaces/data.interface';
import { ServerResponse } from 'http';

export function sendNewUser(res: ServerResponse, newUser: IUser) {
  data.users.push(newUser);
  sendResponse(res, 201, newUser);
}
