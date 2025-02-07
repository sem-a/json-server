import React from "react";
import styles from "./index.module.css";
import { Button } from "../button";

type ErrorMessageProps = {
  message: string;
  onClose: () => void;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message, onClose }) => {
  return (
    <>
      <div className={styles.overlay} onClick={onClose} /> {/* Затемнение фона */}
      <div className={styles.errorContainer}>
        <p className={styles.errorText}>{message}</p>
        <Button type="delete" onClick={onClose}>
          Закрыть
        </Button>
      </div>
    </>
  );
};

export default ErrorMessage;
