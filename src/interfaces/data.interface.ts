export interface IUser {
  id: string;
  name: string;
  age: number;
  hobbies: string[];
}

export interface IData {
  users: IUser[];
}

export interface IError {
  error: string;
}

export type ApiResponse = IUser[] | IUser | IError | null;
