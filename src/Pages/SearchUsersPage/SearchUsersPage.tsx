import React from "react";
import { UsersContainer } from "../../components/UsersApp/Users";
import styles from "./SearchUsersPage.module.scss";
import { useAppSelector } from "../../hooks/redux";
import { Preloader } from "../../components/common/Preloader";

export const SearchUsersPage: React.FC = () => {
  const isLoading = useAppSelector((state) => state.main.isLoading);
  return (
    <div className={styles.search_user_page}>{isLoading ? <Preloader /> : <UsersContainer />}</div>
  );
};
