import React from "react";
import { Outlet } from "react-router-dom";
import { Header } from "../Header";
import styles from "./Layout.module.scss";

export const Layout: React.FC = () => {
  return (
    <div className={styles.app}>
      <Header />

      <div className={styles.container}>
        <Outlet />
      </div>
    </div>
  );
};
