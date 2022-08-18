import React from "react";
import { useAppSelector } from "../../../hooks/redux";
import { SearchField } from "../../Ui";
import { useActions } from "../../../hooks/useActions";

export const ReposSearchFieldContainer: React.FC = () => {
  const { setReposSearchValue } = useActions();

  const reposSearchValue = useAppSelector((state) => state.main.reposSearchValue);

  const handlerSearchReposValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setReposSearchValue(inputValue);
  };

  return (
    <SearchField
      value={reposSearchValue}
      changeValue={handlerSearchReposValue}
      placeholder={"Search for Users' Repositories"}
    />
  );
};
