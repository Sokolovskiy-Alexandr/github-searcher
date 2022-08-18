import React from "react";
import { useInView } from "react-intersection-observer";
import { User } from "../User";
import styles from "./Users.module.scss";
import { IUser } from "../../../types";
import { useActions } from "../../../hooks/useActions";

type UsersPropsType = {
  users: IUser[];
  totalUsersCount: number;
  usersCount: number;
  isLoadMore: boolean;
};

export const Users: React.FC<UsersPropsType> = (props) => {
  const { users, totalUsersCount, usersCount, isLoadMore } = props;

  const { setIsLoadMore } = useActions();

  // Intersection Observer hook
  const { ref: myRef, inView } = useInView();

  React.useEffect(() => {
    if (usersCount < totalUsersCount) {
      setIsLoadMore(inView);
    }
  }, [inView]);

  return (
    <div className={styles.users}>
      {users.map((user) => (
        <User
          key={user.id}
          avatar={user.avatarUrl}
          name={user.name}
          login={user.login}
          repos={user.publicRepos}
        />
      ))}
      <div ref={myRef} />

      {isLoadMore && <h2>Load more users...</h2>}
      <h2>{inView}</h2>
    </div>
  );
};
