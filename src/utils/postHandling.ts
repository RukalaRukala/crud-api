import { IUser } from '../interfaces/data.interface';
import { v4 as uuidv4 } from 'uuid';
import { sendResponse } from './sendResponse';
import { IncomingMessage, ServerResponse } from 'http';
import { isRightInterface } from './isRightInterface';
import { isValidProps } from './isValidProps';
import { sendNewUser } from './sendNewUser';

export function postHandling(req: IncomingMessage, res: ServerResponse) {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    const newUser: IUser = { id: uuidv4(), ...JSON.parse(body) };
    !isRightInterface(newUser)
      ? sendResponse(res, 400, { error: "user doesn't contain require fields" })
      : isValidProps(newUser)
        ? sendNewUser(res, newUser)
        : sendResponse(res, 400, { error: 'the values of the wrong type' });
  });
}
