import React from "react";

import styles from "./Header.module.css";

const Header = () => {
  return (
    <div className={styles.Hero}>
      <h1 className={styles.HeaderText}>
        <span className={styles.subTitle}>Art</span>
        <span className={styles.mainTitle}>Rijksmuseum</span>
      </h1>
    </div>
  );
};

export default Header;
