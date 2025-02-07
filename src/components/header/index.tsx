import React from "react";
import styles from "./index.module.css";
import { Container, Flex } from "../containers";
import { Button } from "../button";
import { Link } from "react-router-dom";
import { PATHS } from "../../paths";

export const Header = () => {
  return (
    <header>
      <Container>
        <Flex alignItems="center" justifyContent="space-between">
          <h1 className={styles.logo}>
            <Link to={PATHS.home}>jsonServer</Link>
          </h1>
          <Button type="normal">
            <Link to={PATHS.add}>добавить</Link>
          </Button>
        </Flex>
      </Container>
    </header>
  );
};
