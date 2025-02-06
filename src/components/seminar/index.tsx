import React from "react";
import { Flex } from "../containers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrashCan,
  faPenToSquare,
  faClock,
} from "@fortawesome/free-regular-svg-icons";
import styles from "./index.module.css";
import { SeminarType } from "../../types";

export const Seminar: React.FC<SeminarType> = ({
  id,
  title,
  description,
  date,
  time,
  photo,
}) => {
  // функция для проверки прошедшей даты и времени
  const isPast = () => {
    const [day, month, year] = date.split(".").map(Number); // разделяем строку и преобразуем в числа
    const seminarDateTime = new Date(
      year,
      month - 1,
      day,
      ...time.split(":").map(Number)
    ); // создаем объект Date
    return seminarDateTime < new Date(); // сравниваем с текущей датой
  };

  const past = isPast();

  // функция для обрезания описания
  const truncateDescription = (desc: string) => {
    if (desc.length <= 100) {
      return desc; // если длина меньше или равна 100, возвращаем оригинал
    }
    const truncated = desc.slice(0, 100).trim();
    const lastSpaceIndex = truncated.lastIndexOf(" ");
    if (lastSpaceIndex === -1) {
      return truncated + "...";
    }
    return truncated.slice(0, lastSpaceIndex) + "...";
  };

  const truncatedDescription = truncateDescription(description); // обрезаем описание

  return (
    <div className={styles.seminar}>
      <Flex alignItems="flex-start" justifyContent="flex-start" gap="14px">
        <img src={require("./image.png")} alt="Фото семинара" />
        <div className={styles.body}>
          <Flex alignItems="center" justifyContent="flex-end" gap="7px">
            <button className={styles.delete}>
              <FontAwesomeIcon
                icon={faTrashCan}
                style={{ color: "white", fontSize: "14px" }}
              />
            </button>
            <button className={styles.edit}>
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
  );
};
