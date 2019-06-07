/* ===== *\
   React
\* ===== */
import React from "react";
import PropTypes from "prop-types";

/* ============ *\
   React-router
\* ============ */
import { Link } from "react-router-dom";

/* =========== *\
   Material-UI
\* =========== */
import Button from "@material-ui/core/Button";

// Internal imports
import styles from "./ArtDetail.module.css";

const AdapterLink = React.forwardRef((props, ref) => (
  <Link innerRef={ref} {...props} />
));

const ArtDetail = ({ artist, title, detail, description, image }) => {
  return (
    <div className={styles.Container}>
      <div className={styles.Line} />

      <div className={styles.Metadata}>
        <div className={styles.Top}>
          <div className={styles.GoBackButton}>
            <Button
              variant="contained"
              color="primary"
              component={AdapterLink}
              to="/"
            >
              &lt;&nbsp;Back
            </Button>
          </div>
          <div>
            <h2>{artist}</h2>
            <h1>{title}</h1>
          </div>
        </div>
        <div className={styles.Bottom}>
          {detail ? <p className={styles.Details}>{detail}</p> : null}
          {description ? (
            <p className={styles.Description}>{description}</p>
          ) : null}
        </div>
      </div>
      <div className={styles.PaintingContainer}>
        <img className={styles.PaintingImage} src={image} alt={"Painting"} />
      </div>
    </div>
  );
};

ArtDetail.propTypes = {
  artist: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  detail: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string
};

export default ArtDetail;
