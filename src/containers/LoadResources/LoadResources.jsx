/* ===== *\
   React
\* ===== */
import React, { Component } from "react";
import PropTypes from "prop-types";

/* =========== *\
   Material-UI
\* =========== */
import CircularProgress from "@material-ui/core/CircularProgress";

import styles from "./LoadResources.module.css";

class LoadResourcesContainer extends Component {
  componentDidMount() {
    this.verifyLoadResource();
  }

  componentDidUpdate(prevProps, prevState) {
    this.verifyLoadResource();
  }

  verifyLoadResource() {
    if (this.loadResourceNeeded()) {
      this.loadResources();
    }
  }

  loadResourceNeeded() {
    return !this.props.loading && !this.props.error && !this.itemInCache();
  }

  loadResources() {
    this.props.loadFunction();
  }

  getResourceFromCache() {
    return this.props.dataLocation;
  }

  itemInCache() {
    return this.getResourceFromCache() !== undefined;
  }

  render() {
    // Default: show a loading indicator
    let toRender = (
      <div className={styles.LoadingContainer}>
        <CircularProgress size={100} />
      </div>
    );

    // If item is in cache, render it
    if (this.itemInCache()) {
      toRender = this.props.render(this.getResourceFromCache());
    }

    // If an error is present, show the error
    if (this.props.error) {
      toRender = <p>{this.props.error.message}</p>;
    }

    return toRender;
  }
}

LoadResourcesContainer.propTypes = {
  dataLocation: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  loadFunction: PropTypes.func.isRequired,
  render: PropTypes.func.isRequired
};

export default LoadResourcesContainer;
