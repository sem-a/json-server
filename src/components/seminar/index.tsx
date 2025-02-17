import React, { useState } from "react";
import { Flex } from "../containers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import styles from "./index.module.css";
import { SeminarType } from "../../types";
import { DeleteModal, EditModal } from "../modal";
import axios from "axios";
import ErrorMessage from "../error";
import { PATHS } from "../../paths";

export const Seminar: React.FC<
  SeminarType & { onDelete: (id: string) => void } & {
    onSave: (data: SeminarType) => void;
  }
> = ({ id, title, description, date, time, photo, onDelete, onSave }) => {
  const [isModalOpen, setIsModalOpen] = useState(false); // cостояние для модального окна
  const [isEditModalOpen, setIsEditModalOpen] = useState(false); // Состояние для модального окна редактирования
  const [error, setError] = useState<string | null>(null);

  // функция для удаления семинара
  const handleDeleteConfirmation = async () => {
    try {
      await axios.delete(`${PATHS.server}${id}`);
      onDelete(id); // обновляю состояние родительского компонента
    } catch (error) {
      console.error("Ошибка при удалении семинара:", error);
      setError("Возникла ошибка при удалении семинара! Попробуйте позже.");
    } finally {
      setIsModalOpen(false); // закрываю модальное окно после завершения
    }
  };

  // функция для изменения семинара
  const handleEditConfirmation = async (formData: SeminarType) => {
    try {
      const [year, month, day] = formData.date.split("-"); // перевод даты из одного
      formData = {                                         // формата в 
        ...formData,                                       // другой
        date: `${day}.${month}.${year}`,
      };

      const { id, ...newFormData } = formData; // деструктуризация объекта 
      const response = await axios.patch(
        `${PATHS.server}${id}`,
        newFormData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      onSave(response.data); // обновляю состояние родительского компонента
    } catch (error) {
      console.error("Ошибка при изменении семинара:", error);
      setError("Возникла ошибка при изменении семинара! Попробуйте позже.");
    } finally {
      setIsEditModalOpen(false);
    }
  };

  // функция для проверки прошедшей даты и времени
  const isPast = () => {
    const [day, month, year] = date.split(".").map(Number); // разделяю строку и преобразую в числа
    const seminarDateTime = new Date(
      year,
      month - 1,
      day,
      ...time.split(":").map(Number)
    ); // создаем объект Date
    return seminarDateTime < new Date(); // сравниваю с текущей датой
  };

  const past = isPast();

  // функция для обрезания описания
  const truncateDescription = (desc: string) => {
    if (desc.length <= 100) {
      return desc; // если длина меньше или равна 100, возвращаю оригинал
    }
    const truncated = desc.slice(0, 100).trim();
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    if (lastSpaceIndex === -1) {
      return truncated + "...";
    }
    return truncated.slice(0, lastSpaceIndex) + "...";
  };

  const truncatedDescription = truncateDescription(description); // обрезаю описание

  return (
    <>
      <div className={styles.seminar}>
        <Flex alignItems="flex-start" justifyContent="flex-start" gap="14px">
          <img src={photo} alt="Cеминар" />
          <div className={styles.body}>
            <Flex alignItems="center" justifyContent="flex-end" gap="7px">
              <button
                className={styles.delete}
                onClick={() => setIsModalOpen(true)}
              >
                <FontAwesomeIcon
                  icon={faTrashCan}
                  style={{ color: "white", fontSize: "14px" }}
                />
              </button>
              <button
                className={styles.edit}
                onClick={() => setIsEditModalOpen(true)}
              >
                <Flex alignItems="center" justifyContent="center" gap="5px">
                  <FontAwesomeIcon
                    icon={faPenToSquare}
                    style={{ color: "white", fontSize: "14px" }}
                  />
                  <p>редактировать</p>
                </Flex>
              </button>
            </Flex>
            <div className={styles.time}>
              <Flex alignItems="center" justifyContent="flex-start" gap="5px">
                <FontAwesomeIcon
                  icon={faClock}
                  style={{ color: "black", fontSize: "14px" }}
                />
                <p style={{ textDecoration: past ? "line-through" : "none" }}>
                  {date}
                </p>
                <p style={{ textDecoration: past ? "line-through" : "none" }}>
                  {time}
                </p>
                {past && <p style={{ color: "red" }}>закончился</p>}
              </Flex>
            </div>
            <div className={styles.title}>
              <h2>{title}</h2>
            </div>
            <div className={styles.description}>
              <p>{truncatedDescription}</p>
            </div>
          </div>
        </Flex>
      </div>
      <DeleteModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onConfirm={handleDeleteConfirmation}
      />
      <EditModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        onSave={handleEditConfirmation}
        initialData={{ id, title, description, date, time, photo }} // передаю текущие данные семинара для редактирования
      />
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
    </>
  );
};
