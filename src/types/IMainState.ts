import { IRepository } from "./IRepository";
import { IUser } from "./IUser";

export interface IMainState {
  isLoading: boolean;
  isLoadMore: boolean;
  isLoadMoreRepos: boolean;
  isUserInfoOpened: boolean;
  reposCurrentPage: number;
  reposCount: number;
  totalReposCount: number;
  error: any;
  userCurrentPage: number;
  totalUsersCount: number;
  usersSearchValue: string;
  reposSearchValue: string;
  filteredRepos: IRepository[];
  repos: IRepository[];
  users: IUser[];
  usersCount: number;
}
