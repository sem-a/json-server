import React, { useEffect, useState } from "react";
import { Container } from "./components/containers";
import { SeminarType } from "./types";
import axios from "axios";
import { Seminar } from "./components/seminar";

function App() {
  const [seminars, setSeminars] = useState<SeminarType[]>([]); // для хранения данных полученных от json-server
  const [loading, setLoading] = useState<boolean>(true); // для управления состоянием загрузки
  const [error, setError] = useState<string | null>(null); // для управления состоянием ошибки

  useEffect(() => {
    // получение данных от json-server и обновление состояния
    const fetchData = async () => {
      try {
        const response = await axios.get<SeminarType[]>(
          "http://localhost:3001/seminars"
        );
        setSeminars(response.data);
      } catch (error) {
        console.log(error);
        setError("Не удалось загрузить данные. Попробуйте позже.");
      } finally {
        setLoading(false); // завершение загрузки
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div>Загрузка...</div>;
  }
  if (error) {
    return <div>Ошибка...</div>;
  }

  return (
    <div className="App">
      <Container>
        {seminars.length == 0
          ? "Нет доступных семинаров."
          : seminars.map(seminar => (<Seminar key={seminar.id} {...seminar} />))}
      </Container>
    </div>
  );
}

export default App;
