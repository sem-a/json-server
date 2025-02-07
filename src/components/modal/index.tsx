import React, { useState } from "react";
import styles from "./index.module.css";
import { Flex } from "../containers";
import { SeminarType } from "../../types";
import { Button } from "../button";
import { Input } from "../input";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
// модальное окно для подтверждения удаления
export const DeleteModal: React.FC<DeleteModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
}) => {
  if (!isOpen) return null; // если модальное окно не открыто возвращается null
  // это нужно для того, чтобы не рендерить лишнее

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <p>Вы дейстивительно хотите удалить этот семинар?</p>
        <Flex alignItems="center" justifyContent="center" gap="14px">
          <Button type="delete" onClick={onConfirm}>
            удалить
          </Button>
          <Button type="cancel" onClick={onClose}>
            отменить
          </Button>
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

// функция для приведения формата даты
const formatDate = (dateString: string) => {
  const [day, month, year] = dateString.split(".");
  return `${year}-${month}-${day}`; // Форматируем в 'гггг-мм-дд'
};

export const EditModal: React.FC<EditModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const transformedInitialData = {
    ...initialData,
    date: formatDate(initialData.date),
  };
  const [formData, setFormData] = useState(transformedInitialData); // состояние для данных формы
  const [error, setError] = useState<string | null>(null); // состояние для ошибки

  if (!isOpen) return null;

  // функция обрабатывает изменения в полях ввода формы
  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // функция для отправки данных формы
  const handleSubmit = () => {
    // проверка заполненности всех полей
    if (
      !formData.title ||
      !formData.description ||
      !formData.date ||
      !formData.time ||
      !formData.photo
    ) {
      setError("Пожалуйста, заполните все поля."); // устанавливаю сообщение об ошибке
      return; // прерываю выполнение функции, если есть ошибки
    }

    setError(null); // сбрасываю ошибку, если все поля заполнены
    onSave(formData); // вызываю функцию сохранения
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <h2 style={{ fontWeight: 700 }}>Редактировать семинар</h2>
        <div className={styles.form}>
          <Input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="Название семинара"
          />
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Описание семинара"
            className={styles.textarea}
          />
          <Input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
          />
          <Input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
          />
          <Input
            type="text"
            name="photo"
            value={formData.photo}
            onChange={handleChange}
            placeholder="URL фотографии"
          />
        </div>
        {error && <p className={styles.errorText}>{error}</p>}{" "}
        <Flex alignItems="center" justifyContent="center" gap="14px">
          <Button type="save" onClick={handleSubmit}>
            сохранить
          </Button>
          <Button type="cancel" onClick={onClose}>
            отменить
          </Button>
        </Flex>
      </div>
    </div>
  );
};
