import { isRightInterface } from './isRightInterface';
import { sendResponse } from './sendResponse';
import { isValidProps } from './isValidProps';
import { ServerResponse } from 'http';
import { IUser } from '../interfaces/data.interface';

export function isInterfaceValid(res: ServerResponse, newUser: IUser) {
  if (!isRightInterface(newUser)) {
    sendResponse(res, 400, { error: "user doesn't contain required fields" });
    return false;
  }
  if (!isValidProps(newUser)) {
    sendResponse(res, 400, { error: 'the values of the wrong type' });
    return false;
  }

  return true;
}
