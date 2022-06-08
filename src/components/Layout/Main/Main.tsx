import React from "react";
import styles from "./Main.module.scss";

const Layout = ({ children }) => (
  <main className={styles.main}>
    {children}
  </main>
);

export default Layout;
