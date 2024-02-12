import { IUser, IUserUnknown } from '../interfaces/data.interface';

export function isRightInterface(user: IUserUnknown): user is IUser {
  return (
    'id' in user &&
    'name' in user &&
    'age' in user &&
    'hobbies' in user &&
    Object.keys(user).length === 4
  );
}
