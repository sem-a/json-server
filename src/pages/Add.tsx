import React from "react";
import { Header } from "../components/header";
import { Button } from "../components/button";
import { Container } from "../components/containers";
import styles from "./add.module.css";

const Add = () => {
  return (
    <>
      <Header />
      <div className="App">
        <Container>
          <form className={styles.form}>
            <Button type="save">сохранить</Button>
            <Button type="cancel">отменить</Button>
          </form>
        </Container>
      </div>
    </>
  );
};

export default Add;
