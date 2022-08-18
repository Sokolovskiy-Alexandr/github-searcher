import React from "react";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { SearchField } from "../../Ui";
import styles from "./UsersSearchField.module.scss";
import { useActions } from "../../../hooks/useActions";

export const UsersSearchField: React.FC = () => {
  const dispatch = useAppDispatch();

  const { resetUsers, setUserCurrentPage, setUsersSearchValue } = useActions();

  const usersSearchValue = useAppSelector((state) => state.main.usersSearchValue);

  const handlerSearchValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (!inputValue) {
      dispatch(resetUsers());
    }
    setUsersSearchValue(inputValue);
    setUserCurrentPage();
  };

  return (
    <div className={styles.users_search_block}>
      <SearchField
        value={usersSearchValue}
        changeValue={handlerSearchValue}
        placeholder="Search users"
      />
    </div>
  );
};
