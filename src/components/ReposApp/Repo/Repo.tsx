import React from "react";
import styles from "./Repo.module.scss";

type RepoTypeProps = {
  name: string;
  htmlUrl: string;
  forks: number;
  stargazersCount: number;
};

export const Repo: React.FC<RepoTypeProps> = (props) => {
  const { name, htmlUrl, forks, stargazersCount } = props;
  return (
    <div className={styles.repo}>
      <div className={styles.repo_name}>
        <h4>Repository name:</h4>
        <a target="_blank" href={htmlUrl} rel="noreferrer">
          <h3>{name}</h3>
        </a>
      </div>
      <div className={styles.repo_stars}>
        <h4>{forks} Forks</h4>
        <h4>{stargazersCount} Stars</h4>
      </div>
    </div>
  );
};
