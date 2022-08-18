import React from "react";
import styles from "./Greeting.module.scss";
import notFoundIcon from "../../../assets/images/not_found_icon.svg";
import searchIcon from "../../../assets/images/search_icon.svg";

type GreetingPropsType = {
  usersSearchValue: string;
};
export const Greeting: React.FC<GreetingPropsType> = ({ usersSearchValue }) => {
  return (
    <>
      {usersSearchValue ? (
        <div className={styles.emptyBlock}>
          <img src={notFoundIcon} alt="icon" />
          <span className={styles.text}>User not found</span>
        </div>
      ) : (
        <div className={styles.emptyBlock}>
          <img src={searchIcon} alt="icon" />
          <span className={styles.text}>
            Start searching on Github,
            <br />
            for reset click on the git icon
          </span>
        </div>
      )}
    </>
  );
};
