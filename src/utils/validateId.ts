import { validate as uuidValidate } from 'uuid';
import { sendResponse } from './sendResponse';
import { IUser } from '../interfaces/data.interface';
import { ServerResponse } from 'http';

export function validateId(
  id: string,
  userById: IUser | undefined,
  res: ServerResponse
) {
  if (!uuidValidate(id)) {
    sendResponse(res, 400, { error: 'id is not valid' });
    return false;
  }

  if (!userById) {
    sendResponse(res, 404, { error: 'user with this ID does not exist' });
    return false;
  }

  return true;
}
