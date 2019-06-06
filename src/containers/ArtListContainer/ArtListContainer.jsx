/* ===== *\
   React
\* ===== */
import React, { Component } from "react";

/* ============= *\
   Redux related
\* ============= */
import { connect } from "react-redux";
import * as actions from "../../store/actions/index.js";

import LoadResources from "../LoadResources/LoadResources";
import ArtList from "../../components/ArtList/ArtList";

class ArtListContainer extends Component {
  constructor(props) {
    super(props);

    this.ROWS_PER_PAGE = 10;

    // We store the index for pagination in the component state (not REDUX)
    this.state = {
      pageIndex: this.props.pageIndex || 0
    };

    /* Following the AirBnb React styleguide:
     "Bind event handlers for the render method in the constructor! 
     ( A bind call in the render path creates a brand new function on every single render. Do not use arrow functions in class fields, because it makes them challenging to test and debug, and can negatively impact performance, and because conceptually, class fields are for data, not logic. )" */
    this.artItemClickedHandler = this.artItemClickedHandler.bind(this);
    this.paginationHandler = this.paginationHandler.bind(this);
  }

  paginationHandler(event, newPage) {
    this.setState({ pageIndex: newPage });
    //this.getArt(newPage);
  }

  artItemClickedHandler(objectNumber) {
    // Push a new URL (consisting of the objectNumber variable) to the 'stack'
    // Using this method, we still allow the use of the back button by the user
    this.props.history.push(`/collection/${objectNumber}`);
  }

  render() {
    return (
      <LoadResources
        fetchFunction={() =>
          this.props.getListArt(this.state.pageIndex, this.ROWS_PER_PAGE)
        }
        dataLocation={this.props.artList[this.state.pageIndex]}
        render={dataList => (
          <ArtList
            artList={dataList}
            pageIndex={this.state.pageIndex}
            rowClicked={this.artItemClickedHandler}
            paginationClicked={this.paginationHandler}
          />
        )}
        error={this.props.error}
        loading={this.props.loading}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.listArt.loading,
    artList: state.listArt.artList,
    error: state.listArt.error,
    pageIndex: state.listArt.currentPage
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getListArt: (pageIndex, rowsPerPage) =>
      dispatch(actions.listArt(pageIndex, rowsPerPage))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtListContainer);
