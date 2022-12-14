import React from "react";
import style from "./Preloader.module.scss";

export const Preloader = () => {
  return (
    <div className={style.fetchingContainer}>
      <div className={style.fetching} />
    </div>
  );
};
