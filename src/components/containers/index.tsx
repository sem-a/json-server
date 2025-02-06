import React from "react";
import styles from "./index.module.css";

type ContainerType = {
  children: React.ReactNode;
};
type FlexType = {
  children: React.ReactNode;
  alignItems?: "stretch" | "center" | "flex-start" | "flex-end" | "baseline";
  justifyContent?:
    | "flex-start"
    | "flex-end"
    | "center"
    | "space-between"
    | "space-around"
    | "space-evenly";
  gap?: string;
};

export const Container: React.FC<ContainerType> = ({ children }) => {
  return <div className={styles.container}>{children}</div>;
};

export const CardContainer: React.FC<ContainerType> = ({ children }) => {
  return <div className={styles.cardContainer}>{children}</div>;
};

export const Flex: React.FC<FlexType> = ({
  children,
  alignItems = "stretch",
  justifyContent = "flex-start",
  gap,
}) => {
  return (
    <div style={{ display: "flex", alignItems, justifyContent, gap }}>
      {children}
    </div>
  );
};
