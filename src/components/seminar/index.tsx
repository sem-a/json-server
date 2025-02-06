import React from "react";
import { CardContainer, Flex } from "../containers";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrashCan, faPenToSquare } from "@fortawesome/free-regular-svg-icons";
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
  return (
    <div className={styles.seminar}>
      <CardContainer>
        <Flex alignItems="center" justifyContent="flex-start">
          <img src={photo} alt="Фото семинара" />
          <div className={styles.body}>
            <Flex alignItems="center" justifyContent="flex-end">
              <button className={styles.delete}>
                <FontAwesomeIcon icon={faTrashCan} />
              </button>
              <button className={styles.edit}>
                <FontAwesomeIcon icon={faPenToSquare} />
                редактировать
              </button>
            </Flex>
            <div className={styles.time}>
              <Flex alignItems="center" justifyContent="flex-start" gap="5px">
                <p>иконка</p>
                <p>{date}</p>
                <p>{time}</p>
              </Flex>
            </div>
            <div className={styles.title}>
              <h2>{title}</h2>
            </div>
            <div className={styles.description}>
              <p>{description}</p>
            </div>
          </div>
        </Flex>
      </CardContainer>
    </div>
  );
};
