import React from "react";
import { useInView } from "react-intersection-observer";
import { useAppDispatch } from "../../../hooks/redux";
import { Repo } from "../Repo";
import { IRepository } from "../../../types";
import { useActions } from "../../../hooks/useActions";

type ReposPropsType = {
  filteredRepos: IRepository[];
  totalReposCount: number;
  reposCount: number;
  isLoadMoreRepos: boolean;
  reposSearchValue: string;
};

export const Repos: React.FC<ReposPropsType> = (props) => {
  const { reposCount, totalReposCount, filteredRepos, isLoadMoreRepos, reposSearchValue } = props;

  const { setIsLoadRepoMore } = useActions();

  const dispatch = useAppDispatch();

  // Intersection Observer hook
  const { ref: myRef, inView } = useInView();

  React.useEffect(() => {
    if (reposCount < totalReposCount && !reposSearchValue) {
      dispatch(setIsLoadRepoMore(inView));
    }
  }, [inView]);

  return (
    <>
      {filteredRepos.map((repo) => (
        <Repo
          key={repo.id}
          name={repo.name}
          forks={repo.forks}
          stargazersCount={repo.stargazersCount}
          htmlUrl={repo.htmlUrl}
        />
      ))}
      <div ref={myRef} />
      {isLoadMoreRepos && <h2>Load more repos...</h2>}
      <h2>{inView}</h2>
    </>
  );
};
