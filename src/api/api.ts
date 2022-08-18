import axios, { AxiosInstance } from "axios";

const instance: AxiosInstance = axios.create({
  baseURL: "https://api.github.com/",
  headers: {
    Authorization: `${process.env.REACT_APP_GITHUB_TOKEN}`,
  },
});

export const Api = {
  searchUsers: async (searchValue: string, page: number = 1) => {
    return instance.get(`search/users?q=${searchValue}&per_page=5&page=${page}`);
  },
  getUserInfoByLogin: async (userLogin: string) => {
    return instance.get(`users/${userLogin}`);
  },
  getUserReposByLogin: async (login: string, page: number = 1) => {
    return instance.get(`users/${login}/repos?per_page=5&page=${page}`);
  },
};
