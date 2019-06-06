import React from "react";

import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";

import styles from "./ArtDetail.module.css";

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const ArtDetail = ({ artist, title, detail, description, image }) => {
  return (
    <div className={styles.Container}>
      <Button
        variant="contained"
        color="primary"
        component={AdapterLink}
        to="/"
        className={styles.GoBackButton}
      >
        Back
      </Button>
      <div className={styles.Line} />

      <div className={styles.Metadata}>
        <div className={styles.Top}>
          <h2>{artist}</h2>
          <h1>{title}</h1>
        </div>
        <div className={styles.Bottom}>
          <p className={styles.Details}>{detail}</p>
          <p className={styles.Description}>{description}</p>
        </div>
      </div>
      <div className={styles.PaintingContainer}>
        <img className={styles.PaintingImage} src={image} alt={"Painting"} />
      </div>
    </div>
  );
};

export default ArtDetail;
