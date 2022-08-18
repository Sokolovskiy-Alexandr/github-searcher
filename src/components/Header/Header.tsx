import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Header.module.scss";
import { UsersSearchField } from "../UsersApp/UsersSearchField";
import logo from "../../assets/images/gitHub.png";
import { useAppSelector } from "../../hooks/redux";
import { useActions } from "../../hooks/useActions";
import { ReposSearchFieldContainer } from "../ReposApp/ReposSearchField";

export const Header: React.FC = () => {
  const { resetUsers } = useActions();
  const navigate = useNavigate();

  const usersCount = useAppSelector((state) => state.main.usersCount);
  const totalUsersCount = useAppSelector((state) => state.main.totalUsersCount);
  const isUserInfoOpened = useAppSelector((state) => state.main.isUserInfoOpened);

  const reposCount = useAppSelector((state) => state.main.reposCount);
  const totalReposCount = useAppSelector((state) => state.main.totalReposCount);

  const goToHome = () => {
    navigate("/", { replace: true });
    resetUsers();
  };
  return (
    <header className={styles.header}>
      <div className={styles.header_logo}>
        <img src={logo} alt="logo" onClick={goToHome} />
        <h1>Github Searcher</h1>
      </div>

      {!isUserInfoOpened ? (
        <>
          <div className={styles.header_searchField}>
            <UsersSearchField />
          </div>

          <div className={styles.header_score}>
            <span>Total users: {totalUsersCount}</span>
            <span>Users on the screen: {usersCount}</span>
          </div>
        </>
      ) : (
        <>
          <div className={styles.header_searchField}>
            <ReposSearchFieldContainer />
          </div>
          <div className={styles.header_score}>
            <span>Total repos: {totalReposCount}</span>
            <span>Repo on the screen: {reposCount}</span>
          </div>
        </>
      )}
    </header>
  );
};
