import React, { Component } from "react";

//import painting from "../../assets/images/van-gogh.jpg";
import styles from "./ArtDetail.module.css";

/* =========== *\
   Material-UI
\* =========== */
import CircularProgress from "@material-ui/core/CircularProgress";

/* ============= *\
   Redux related
\* ============= */
import { connect } from "react-redux";
import * as actions from "../../store/actions/index.js";

class ArtDetail extends Component {
  constructor(props) {
    super(props);

    // Get objectnumber from URL
    const pathNameList = this.props.history.location.pathname.split("/");
    this.objectNumber = pathNameList[pathNameList.length - 1];

    this.getArtDetail = this.getArtDetail.bind(this);
    this.areItemsInCache = this.areItemsInCache.bind(this);
  }

  componentDidMount() {
    this.getArtDetail(this.objectNumber);
  }

  getArtDetail(objectNumber) {
    if (!this.areItemsInCache(objectNumber)) {
      this.props.getArtDetail(objectNumber);
    }
  }

  areItemsInCache(objectNumber) {
    return this.props.artDetail[objectNumber] !== undefined;
  }

  render() {
    let pageContent = (
      <div className={styles.Loading}>
        <CircularProgress size={100} />
      </div>
    );

    if (!this.props.loading && this.props.artDetail[this.objectNumber]) {
      const {
        title,
        artist,
        detail,
        description,
        image
      } = this.props.artDetail[this.objectNumber];

      pageContent = (
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
            <img
              className={styles.PaintingImage}
              src={image}
              alt={"Painting"}
            />
          </div>
        </div>
      );
    }

    return pageContent;
  }
}

const mapStateToProps = state => {
  return {
    artDetail: state.artDetail.artDetail,
    loading: state.artDetail.loading,
    cache: state.artDetail.cache
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getArtDetail: objectNumber => dispatch(actions.getArtDetail(objectNumber))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtDetail);
