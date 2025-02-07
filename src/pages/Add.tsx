import React, { useState } from "react";
import { Header } from "../components/header";
import { Button } from "../components/button";
import { Container } from "../components/containers";
import styles from "./add.module.css";
import { Input } from "../components/input";
import axios from "axios";
import ErrorMessage from "../components/error";

const Add = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    photo: "",
  }); // для управления состоянием полей формы
  const [error, setError] = useState<string | null>(null);

  // функция обрабатывает изменения в полях ввода формы
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  // отвечает за добавление нового семинара
  const handleAddSeminar = async () => {
    // проверка на заполненность всех полей
    if (!formData.title || !formData.description || !formData.date || !formData.time || !formData.photo) {
      setError("Пожалуйста, заполните все поля.");
      return; // выход из функции, если есть ошибки
    }
    
    try {
      const [year, month, day] = formData.date.split("-");            // преобразование даты
      const body = { ...formData, date: `${day}.${month}.${year}` };  // из одного формата в другой

      const response = await axios.post("http://localhost:3001/seminars", body);

      console.log("Семинар успешно добавлен:", response.data);
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        photo: "",
      });
    } catch (error) {
      console.error("Ошибка при добавлении семинара:", error);
      setError("Возникла ошибка при создании семинара! Попробуйте позже.");
    }
  };

  return (
    <>
      <Header />
      {error && <ErrorMessage message={error} onClose={() => setError(null)} />}
      <div className="App">
        <Container>
          <div className={styles.form}>
            <Input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Тема"
            />
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Описание"
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
            <Button type="save" onClick={handleAddSeminar}>
              сохранить
            </Button>
          </div>
        </Container>
      </div>
    </>
  );
};

export default Add;
