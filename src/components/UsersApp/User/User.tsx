import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./User.module.scss";
import { useActions } from "../../../hooks/useActions";

type UserPropsType = {
  name: string | null;
  login: string;
  avatar: string;
  repos: number | null;
};

export const User: React.FC<UserPropsType> = (props) => {
  const { name, login, avatar, repos } = props;
  const navigate = useNavigate();

  const { setTotalRepos, setIsUserInfoOpened } = useActions();

  const goToMoreInfo = () => {
    navigate(`/user/${login}`);
    setTotalRepos(repos);
    setIsUserInfoOpened(true);
  };

  return (
    <div className={styles.user_container} onClick={goToMoreInfo}>
      <img src={avatar} alt="Avatar" />
      {name ? (
        <div className={styles.user_name}>
          <h4>User name:</h4>
          <h3>{name}</h3>
        </div>
      ) : (
        <div className={styles.user_name}>
          <h4>User login:</h4>
          <h3>{login}</h3>
        </div>
      )}
      <h4 className={styles.user_repo}>Repo: {repos}</h4>
    </div>
  );
};
