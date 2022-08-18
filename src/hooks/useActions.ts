import { bindActionCreators } from "@reduxjs/toolkit";
import { useAppDispatch } from "./redux";
import { mainActions } from "../redux/mainSlice";

const allActions = {
  ...mainActions,
};

export const useActions = () => {
  const dispatch = useAppDispatch();
  return bindActionCreators(allActions, dispatch);
};
