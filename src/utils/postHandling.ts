import { IUser } from '../interfaces/data.interface';
import { v4 as uuidv4 } from 'uuid';
import { IncomingMessage, ServerResponse } from 'http';
import { sendNewUser } from './sendNewUser';
import { isInterfaceValid } from './isInterfaceValid';
import { parseJSON } from './parseJSON';
import { sendResponse } from './sendResponse';

export function postHandling(req: IncomingMessage, res: ServerResponse) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    try {
      const newUser: IUser = { id: uuidv4(), ...parseJSON(body) };
      if (isInterfaceValid(res, newUser)) {
        sendNewUser(res, newUser);
      }
    } catch (err) {
      sendResponse(res, 404, { error: 'JSON is not valid' });
    }
  });
}
