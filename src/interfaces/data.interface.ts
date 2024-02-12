export interface IUser {
  id: string;
  name: string;
  age: number;
  hobbies: string[];
}

export interface IUserUnknown {
  id: unknown;
  name: unknown;
  age: unknown;
  hobbies: unknown;
}

export interface IData {
  users: IUser[];
}

export interface IDataUnknown {
  users: IUserUnknown[];
}

export interface IError {
  error: string;
}

export type ApiResponse = IUser[] | IUser | IError | null;
