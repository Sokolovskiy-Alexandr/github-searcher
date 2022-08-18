import { AnyAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { IRepository, IGetUsersThunk, IMainState } from "../types";
import { formatRepoData, formatUserData } from "../services/formatUtils";

import type { RootState } from "./store";
import { Api } from "../api";

export const getUsers = createAsyncThunk<
  IGetUsersThunk,
  string,
  { rejectValue: string; state: RootState }
>("main/getUsers", async (searchValue, { rejectWithValue, getState }) => {
  try {
    const { userCurrentPage } = getState().main;
    const response = await Api.searchUsers(searchValue, userCurrentPage);
    const foundUsers = response.data.items;
    const totalUsersCount = response.data.total_count;
    const users = await Promise.all(
      foundUsers.map(async (user: any) => {
        const data = await Api.getUserInfoByLogin(user.login);
        return formatUserData(data);
      }),
    );
    return { users, totalUsersCount } as IGetUsersThunk;
  } catch (error: any) {
    if (!error.response) {
      throw new Error("GetUsers some error");
    }
    return rejectWithValue(error.response.data);
  }
});

export const getRepos = createAsyncThunk<
  IRepository[],
  string,
  { rejectValue: string; state: RootState }
>("main/getRepos", async (login, { rejectWithValue, getState }) => {
  try {
    const { reposCurrentPage } = getState().main;
    const response = await Api.getUserReposByLogin(login, reposCurrentPage);
    const repos = formatRepoData(response);
    return repos as IRepository[];
  } catch (error: any) {
    if (!error.response) {
      throw new Error("GetRepos some error");
    }
    return rejectWithValue(error.response.data);
  }
});

const initialState = {
  isLoading: false,
  isLoadMore: false,
  isLoadMoreRepos: false,
  isUserInfoOpened: false,
  reposCurrentPage: 1,
  reposCount: 0,
  totalReposCount: 0,
  error: null,
  totalUsersCount: 0,
  usersCount: 0,
  userCurrentPage: 1,
  usersSearchValue: "",
  reposSearchValue: "",
  filteredRepos: [],
  users: [],
  repos: [],
} as IMainState;

const mainSlice = createSlice({
  name: "gitHubSearcher",
  initialState,
  reducers: {
    resetUsers: (state) => {
      state.users = [];
      state.totalUsersCount = 0;
      state.usersCount = 0;
      state.userCurrentPage = 1;
      state.usersSearchValue = "";
    },
    resetRepos: (state) => {
      state.repos = [];
      state.reposCount = 0;
      state.totalReposCount = 0;
      state.reposCurrentPage = 1;
      state.reposSearchValue = "";
    },
    clearFilteredRepos: (state) => {
      state.filteredRepos = [];
    },
    setUsersSearchValue: (state, action) => {
      state.usersSearchValue = action.payload;
    },
    setReposSearchValue: (state, action) => {
      state.reposSearchValue = action.payload;
    },
    setIsLoadRepoMore: (state, action) => {
      state.isLoadMoreRepos = action.payload;
    },
    setTotalRepos: (state, action) => {
      state.totalReposCount = action.payload;
    },
    setFilteredRepos: (state, action) => {
      state.filteredRepos = action.payload;
    },
    setIsLoadMore: (state, action) => {
      state.isLoadMore = action.payload;
    },
    setUserCurrentPage: (state) => {
      state.userCurrentPage = 1;
    },
    setIsUserInfoOpened: (state, action) => {
      state.isUserInfoOpened = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        if (state.userCurrentPage === 1) {
          state.isLoading = true;
          state.error = null;
        }
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        if (state.userCurrentPage === 1) {
          state.users = action.payload.users;
          state.totalUsersCount = action.payload.totalUsersCount;
          state.isLoading = false;
        } else {
          state.users = [...state.users, ...action.payload.users];
          state.isLoadMore = false;
        }
        state.userCurrentPage += 1;
        state.usersCount = state.users.length;
        state.error = null;
      })
      .addCase(getRepos.pending, (state) => {
        if (state.reposCurrentPage === 1) {
          state.isLoading = true;
          state.error = null;
        }
      })
      .addCase(getRepos.fulfilled, (state, action) => {
        if (state.reposCurrentPage === 1) {
          state.repos = action.payload;
          state.isLoading = false;
        } else {
          state.repos = [...state.repos, ...action.payload];
          state.isLoadMoreRepos = false;
        }
        state.reposCurrentPage += 1;
        state.reposCount = state.repos.length;
        state.error = null;
      })
      .addMatcher(isError, (state, action) => {
        state.error = action.payload;
        state.isLoading = false;
      });
  },
});

function isError(action: AnyAction) {
  return action.type.endsWith("rejected");
}

export const mainActions = mainSlice.actions;
export default mainSlice.reducer;
