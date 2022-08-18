import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { useDebounce } from "../../../hooks/useDebounce";
import { getUsers } from "../../../redux/mainSlice";
import { Users } from "./Users";
import { Greeting } from "../../common/Greeting";

export const UsersContainer: React.FC = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector((state) => state.main.users);
  const usersCount = useAppSelector((state) => state.main.usersCount);
  const totalUsersCount = useAppSelector((state) => state.main.totalUsersCount);
  const userCurrentPage = useAppSelector((state) => state.main.userCurrentPage);

  const isLoadMore = useAppSelector((state) => state.main.isLoadMore);
  const err = useAppSelector((state) => state.main.error);

  const usersSearchValue = useAppSelector((state) => state.main.usersSearchValue);
  const debouncedSearch = useDebounce(usersSearchValue, 1000);

  // запрос за данными
  React.useEffect(() => {
    if (debouncedSearch && userCurrentPage === 1) {
      dispatch(getUsers(debouncedSearch));
    }
  }, [debouncedSearch]);

  // запрос за доп данными
  React.useEffect(() => {
    if (debouncedSearch && isLoadMore) {
      dispatch(getUsers(debouncedSearch));
    }
  }, [isLoadMore]);

  return (
    <>
      {err ? (
        <h2>{err?.message}</h2>
      ) : usersCount ? (
        <Users
          users={users}
          totalUsersCount={totalUsersCount}
          usersCount={usersCount}
          isLoadMore={isLoadMore}
        />
      ) : (
        <Greeting usersSearchValue={usersSearchValue} />
      )}
    </>
  );
};
