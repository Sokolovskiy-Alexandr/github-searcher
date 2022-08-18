import { IUser } from "./IUser";

export interface IGetUsersThunk {
  users: IUser[];
  totalUsersCount: number;
}
