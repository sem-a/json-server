import React from "react";
import styles from "./index.module.css";

type InputType = {
  type: "text" | "date" | "time";
  name: string;
  value: string;
  onChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
};

export const Input: React.FC<InputType> = ({
  type,
  name,
  value,
  onChange,
  placeholder,
}) => {
  return (
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={styles.input}
    />
  );
};
