import React, { Component } from "react";

//import painting from "../../assets/images/van-gogh.jpg";
import styles from "./ArtDetail.module.css";

/* ============= *\
   Redux related
\* ============= */
import { connect } from "react-redux";
import * as actions from "../../store/actions/index.js";

class ArtDetail extends Component {
  componentDidMount() {
    const pathNameList = this.props.history.location.pathname.split("/");
    const objectNumber = pathNameList[pathNameList.length - 1];
    this.props.getArtDetail(objectNumber);
  }

  render() {
    const { title, artist, detail, description, image } = this.props.artDetail;

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
  }
}

const mapStateToProps = state => {
  return {
    artDetail: state.artDetail.artDetail
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
