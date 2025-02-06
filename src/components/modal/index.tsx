import React from "react";
import styles from "./index.module.css";
import { Flex } from "../containers";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>Вы дейстивительно хотите удалить этот семинар?</p>
        <Flex alignItems="center" justifyContent="center" gap="14px">
          <button className={styles.delete} onClick={onConfirm}>
            удалить
          </button>
          <button className={styles.cancle} onClick={onClose}>
            отмена
          </button>
        </Flex>
      </div>
    </div>
  );
};
