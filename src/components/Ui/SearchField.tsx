import React from "react";
import styles from "./SearchField.module.scss";

type SearchFieldTypeProps = {
  value: string;
  changeValue: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
};

export const SearchField: React.FC<SearchFieldTypeProps> = (props) => {
  const { value, changeValue, placeholder } = props;

  return (
    <input
      className={styles.text_field}
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={changeValue}
    />
  );
};
