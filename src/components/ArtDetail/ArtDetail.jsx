import React from "react";

import styles from "./ArtDetail.module.css";

const ArtDetail = ({ artist, title, detail, description, image }) => {
  console.log(artist);
  return (
    <div className={styles.Container}>
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
