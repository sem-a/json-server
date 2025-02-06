import React from "react";
import styles from "./index.module.css";
import { Container, Flex } from "../containers";

export const Header = () => {
  return (
    <header>
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <h1 className={styles.logo}>jsonServer</h1>
          <button className={styles.add}>добавить</button>
        </Flex>
      </Container>
    </header>
  );
};
