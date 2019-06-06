/* ===== *\
   React
\* ===== */
import React, { Component } from "react";

/* =========== *\
   Material-UI
\* =========== */
import CircularProgress from "@material-ui/core/CircularProgress";

class LoadResourcesContainer extends Component {
  componentDidMount() {
    if (!this.itemInCache()) {
      this.fetchResources();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (!this.props.loading && !this.itemInCache()) {
      this.fetchResources();
    }
  }

  fetchResources() {
    this.props.fetchFunction();
  }

  getResourceFromCache() {
    return this.props.dataLocation;
  }

  itemInCache() {
    return this.getResourceFromCache() !== undefined;
  }

  render() {
    // Default: show a loading indicator
    const styling = {
      display: "flex",
      height: "100%",
      alignItems: "center",
      justifyContent: "center",
      marginTop: "5rem"
    };
    let toRender = (
      <div style={styling}>
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

export default LoadResourcesContainer;
