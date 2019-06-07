/* ===== *\
   React
\* ===== */
import React from "react";
import PropTypes from "prop-types";

// Internal imports
import styles from "./Layout.module.css";

const Layout = ({ header, children }) => {
  return (
    <div className={styles.Layout}>
      <header className={styles.Header}>{header}</header>
      <main className={styles.Main}>{children}</main>
    </div>
  );
};

Layout.propTypes = {
  header: PropTypes.element.isRequired,
  children: PropTypes.node.isRequired
};

export default Layout;
