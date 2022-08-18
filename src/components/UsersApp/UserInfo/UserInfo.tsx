import React from "react";
import { useParams } from "react-router-dom";
import { useAppSelector } from "../../../hooks/redux";
import styles from "./UserInfo.module.scss";

export const UserInfo: React.FC = () => {
  const { login } = useParams();

  const user = useAppSelector((state) => state.main.users.find((u) => u.login === login));
  const date = user?.createdAt;

  return (
    <div className={styles.user_main}>
      <div className={styles.user_info}>
        <img src={user?.avatarUrl} alt={user?.avatarUrl} />

        <div className={styles.user_desc}>
          <div className={styles.user_desc_item}>
            {user?.name ? (
              <>
                <div className={styles.user_desc_item_row}>
                  <h4>User Name:</h4>
                </div>
                <h3>{user?.name}</h3>
              </>
            ) : (
              <>
                <div className={styles.user_desc_item_row}>
                  <h4>User Logo:</h4>
                </div>
                <h3>{user?.login}</h3>
              </>
            )}
          </div>
          <div className={styles.user_desc_item}>
            <div className={styles.user_desc_item_row}>
              <h4>Email:</h4>
            </div>
            <h3>{user?.email ?? "none"}</h3>
          </div>

          <div className={styles.user_desc_item}>
            <div className={styles.user_desc_item_row}>
              <h4>Location:</h4>
            </div>
            <h3>{user?.location ?? "none"}</h3>
          </div>
          <div className={styles.user_desc_item}>
            <div className={styles.user_desc_item_row}>
              <h4>Join Date:</h4>
            </div>
            <h3>{date}</h3>
          </div>
          <div className={styles.user_desc_item}>
            <div className={styles.user_desc_item_row}>
              <h4>Followers:</h4>
            </div>
            <h3>{user?.followers}</h3>
          </div>
          <div className={styles.user_desc_item}>
            <div className={styles.user_desc_item_row}>
              <h4>Following:</h4>
            </div>
            <h3>{user?.following}</h3>
          </div>
        </div>
      </div>
      <div className={styles.user_bio}>
        {user?.bio ? <h5>Bio: {user.bio}</h5> : <h5>This user don`t have biography</h5>}
      </div>
    </div>
  );
};
