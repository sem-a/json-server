import React, { useState } from "react";
import { Header } from "../components/header";
import { Button } from "../components/button";
import { Container, Flex } from "../components/containers";
import styles from "./add.module.css";
import { Input } from "../components/input";
import axios from "axios";

const Add = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    date: "",
    time: "",
    photo: "",
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddSeminar = async () => {
    try {
      const [year, month, day] = formData.date.split("-");
      const body = { ...formData, date: `${day}.${month}.${year}` };

      const response = await axios.post("http://localhost:3001/seminars", body);

      console.log("Семинар успешно добавлен:", response.data);
      // Логика для очистки формы после добавления (если необходимо)
      setFormData({
        title: "",
        description: "",
        date: "",
        time: "",
        photo: "",
      });
    } catch (error) {
      console.error("Ошибка при добавлении семинара:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="App">
        <Container>
          <form className={styles.form}>
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
            />
            <Button type="save" onClick={handleAddSeminar}>
              сохранить
            </Button>
          </form>
        </Container>
      </div>
    </>
  );
};

export default Add;
