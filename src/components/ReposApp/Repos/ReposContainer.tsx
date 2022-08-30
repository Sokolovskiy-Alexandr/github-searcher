import React from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/redux";
import { getRepos } from "../../../redux/mainSlice";
import { Repos } from "./Repos";
import { useActions } from "../../../hooks/useActions";
import { Preloader } from "../../common/Preloader";

export const ReposContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const { login } = useParams();

  const { clearFilteredRepos, resetRepos, setFilteredRepos, setIsUserInfoOpened } = useActions();

  const isLoading = useAppSelector((state) => state.main.isLoading);
  const isLoadMoreRepos = useAppSelector((state) => state.main.isLoadMoreRepos);

  const repos = useAppSelector((state) => state.main.repos);

  const reposSearchValue = useAppSelector((state) => state.main.reposSearchValue);
  const filteredRepos = useAppSelector((state) => state.main.filteredRepos);

  const reposCurrentPage = useAppSelector((state) => state.main.reposCurrentPage);
  const totalReposCount = useAppSelector((state) => state.main.totalReposCount);
  const reposCount = useAppSelector((state) => state.main.reposCount);

  const err = useAppSelector((state) => state.main.error);

  // function for filtering repos array
  const filterRepos = (value: string) => {
    let reposData = [...repos];
    reposData = reposData.filter((repo) => repo.name.toLowerCase().includes(value.toLowerCase()));
    dispatch(setFilteredRepos(reposData));
  };

  React.useEffect(() => {
    if (reposCurrentPage === 1) {
      dispatch(getRepos(login as string));
    }
    return () => {
      resetRepos();
      clearFilteredRepos();
      setIsUserInfoOpened(false);
    };
  }, []);

  React.useEffect(() => {
    if (reposCount < totalReposCount && reposCurrentPage > 1) {
      dispatch(getRepos(login as string));
    }
  }, [isLoadMoreRepos]);

  React.useEffect(() => {
    setFilteredRepos(repos);
  }, [repos]);

  React.useEffect(() => {
    filterRepos(reposSearchValue);
  }, [reposSearchValue]);

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <>
      {err ? (
        <h2>{err}</h2>
      ) : (
        <Repos
          filteredRepos={filteredRepos}
          reposCount={reposCount}
          totalReposCount={totalReposCount}
          isLoadMoreRepos={isLoadMoreRepos}
          reposSearchValue={reposSearchValue}
        />
      )}
    </>
  );
};
