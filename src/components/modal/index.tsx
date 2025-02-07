import React, { useState } from "react";
import styles from "./index.module.css";
import { Flex } from "../containers";
import { SeminarType } from "../../types";

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

interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (data: SeminarType) => void;
  initialData: SeminarType;
}

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [formData, setFormData] = useState(initialData);

  if (!isOpen) return null;

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2>Редактировать семинар</h2>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Название семинара"
          className={styles.input}
        />
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Описание семинара"
          className={styles.textarea}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleChange}
          className={styles.input}
        />
        <input
          type="text"
          name="photo"
          value={formData.photo}
          onChange={handleChange}
          placeholder="URL фотографии"
          className={styles.input}
        />

        <Flex alignItems="center" justifyContent="center" gap="14px">
          <button className={styles.save} onClick={handleSubmit}>
            сохранить
          </button>
          <button className={styles.cancel} onClick={onClose}>
            отмена
          </button>
        </Flex>
      </div>
    </div>
  );
};
