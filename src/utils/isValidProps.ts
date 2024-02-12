import { IUserUnknown } from '../interfaces/data.interface';

export function isValidProps(user: IUserUnknown) {
  return (
    typeof user.id === 'string' &&
    typeof user.name === 'string' &&
    typeof user.age === 'number' &&
    Array.isArray(user.hobbies) &&
    user.hobbies.every(hobby => typeof hobby === 'string')
  );
}
