import { IUser } from '../interfaces/data.interface';
import { v4 as uuidv4 } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import { sendNewUser } from './sendNewUser';
import { isInterfaceValid } from './isInterfaceValid';

export function postHandling(req: IncomingMessage, res: ServerResponse) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const newUser: IUser = { id: uuidv4(), ...JSON.parse(body) };
    if (isInterfaceValid(res, newUser)) {
      sendNewUser(res, newUser);
    }
  });
}
