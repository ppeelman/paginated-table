import React from "react";

import styles from "./Layout.module.css";

const Layout = ({ header, children }) => {
  return (
    <div className={styles.Layout}>
      <header className={styles.Header}>{header}</header>
      <main className={styles.Main}>{children}</main>
    </div>
  );
};

export default Layout;
