import React from "react";
import { Link } from "react-router-dom";
import { UserInfo } from "../../components/UsersApp/UserInfo";
import { ReposContainer } from "../../components/ReposApp/Repos";
import styles from "./UserPage.module.scss";

export const UserPage: React.FC = () => {
  return (
    <div className={styles.user_page}>
      <UserInfo />
      <div className={styles.user_page_link}>
        <Link to="/">Go back</Link>
      </div>
      <ReposContainer />
    </div>
  );
};
