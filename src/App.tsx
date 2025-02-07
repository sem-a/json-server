import React, { useEffect, useState } from "react";
import { Container } from "./components/containers";
import { SeminarType } from "./types";
import axios from "axios";
import { Seminar } from "./components/seminar";
import { Header } from "./components/header";
import ErrorMessage from "./components/error";
import { PATHS } from "./paths";
import Loader from "./components/loading";

function App() {
  const [seminars, setSeminars] = useState<SeminarType[]>([]); // для хранения данных полученных от json-server
  const [loading, setLoading] = useState<boolean>(true); // для управления состоянием загрузки
  const [error, setError] = useState<string | null>(null); // для управления состоянием ошибки

  useEffect(() => {
    // получение данных от json-server и обновление состояния
    const fetchData = async () => {
      try {
        const response = await axios.get<SeminarType[]>(PATHS.server);
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

  // функция для обновления состояния после удаления семинара
  const handleDelete = (id: string) => {
    setSeminars((prevSeminars) =>
      prevSeminars.filter((seminar) => seminar.id !== id)
    );
  };

  // функция для обновления состояния после сохранения семинара
  const handleSave = async (data: SeminarType) => {
    setSeminars((prevSeminars) =>
      prevSeminars.map((seminar) => (seminar.id === data.id ? data : seminar))
    );
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <>
      <Header />
      <div className="App">
        <Container>
          {error && (
            <ErrorMessage message={error} onClose={() => setError(null)} />
          )}
          <div className="seminars">
            {seminars.length === 0
              ? "Нет доступных семинаров."
              : seminars.map((seminar) => (
                  <Seminar
                    key={seminar.id}
                    {...seminar}
                    onDelete={handleDelete}
                    onSave={handleSave}
                  />
                ))}
          </div>
        </Container>
      </div>
    </>
  );
}

export default App;
