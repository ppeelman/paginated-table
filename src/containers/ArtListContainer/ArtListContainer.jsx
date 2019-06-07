/* ===== *\
   React
\* ===== */
import React, { Component } from "react";
import PropTypes from "prop-types";

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
    /* With every GET request, we get enough art data for 10 table pages because
     there is almost no performance disadvantage when querying more record */
    this.NUMBER_OF_PAGES_PRELOAD = 10;

    /* Following the AirBnb React styleguide:
     "Bind event handlers for the render method in the constructor! 
     ( A bind call in the render path creates a brand new function on every single render. Do not use arrow functions in class fields, because it makes them challenging to test and debug, and can negatively impact performance, and because conceptually, class fields are for data, not logic. )" */
    this.artItemClickedHandler = this.artItemClickedHandler.bind(this);
    this.paginationHandler = this.paginationHandler.bind(this);
  }

  paginationHandler(event, newPage) {
    this.props.onChangePage(newPage);
  }

  artItemClickedHandler(objectNumber) {
    // Push a new URL (consisting of the objectNumber variable) to the 'stack'
    // Using this method, we still allow the use of the back button by the user
    this.props.history.push(`/collection/${objectNumber}`);
  }

  render() {
    return (
      <LoadResources
        loadFunction={() =>
          this.props.getListArt(
            this.props.pageIndex,
            this.ROWS_PER_PAGE,
            this.NUMBER_OF_PAGES_PRELOAD
          )
        }
        dataLocation={this.props.artList[this.props.pageIndex]}
        render={dataList => (
          <ArtList
            artList={dataList}
            pageIndex={this.props.pageIndex}
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

ArtListContainer.propTypes = {
  // Redux props
  loading: PropTypes.bool.isRequired,
  artList: PropTypes.object.isRequired,
  error: PropTypes.object,
  pageIndex: PropTypes.number.isRequired,
  getListArt: PropTypes.func.isRequired,
  onChangePage: PropTypes.func.isRequired,

  // React-router props
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

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
    getListArt: (pageIndex, rowsPerPage, pagesToFetch) =>
      dispatch(actions.listArt(pageIndex, rowsPerPage, pagesToFetch)),
    onChangePage: newPage => dispatch(actions.changePage(newPage))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtListContainer);
