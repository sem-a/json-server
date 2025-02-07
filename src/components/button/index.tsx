import React from "react";
import styles from "./index.module.css";

type ButtonProps = {
  type: "save" | "cancel" | "delete" | "normal";
  children: React.ReactNode;
  onClick?: () => void;
};

const buttonStyles: Record<ButtonProps["type"], string> = {
  save: styles.save,
  cancel: styles.cancel,
  delete: styles.delete,
  normal: styles.normal,
};

export const Button: React.FC<ButtonProps> = ({ type, children, onClick }) => {
  return (
    <button className={buttonStyles[type]} onClick={onClick}>
      {children}
    </button>
  );
};
