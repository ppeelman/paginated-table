/* ===== *\
   React
\* ===== */
import React, { Component } from "react";

/* =========== *\
   Material-UI
\* =========== */
import CircularProgress from "@material-ui/core/CircularProgress";

/* ============= *\
   Redux related
\* ============= */
import { connect } from "react-redux";
import * as actions from "../../store/actions/index.js";

import ArtTable from "../../components/ArtTable/ArtTable";

class ArtList extends Component {
  constructor(props) {
    super(props);

    this.ROWS_PER_PAGE = 10;

    // We store the index for pagination in the component state (not REDUX)
    this.state = {
      pageIndex: 0
    };

    /* Following the AirBnb React styleguide:
     "Bind event handlers for the render method in the constructor! 
     ( A bind call in the render path creates a brand new function on every single render. Do not use arrow functions in class fields, because it makes them challenging to test and debug, and can negatively impact performance, and because conceptually, class fields are for data, not logic. )" */
    this.getArt = this.getArt.bind(this);
    this.areItemsInCache = this.areItemsInCache.bind(this);
    this.artItemClickedHandler = this.artItemClickedHandler.bind(this);
    this.paginationHandler = this.paginationHandler.bind(this);
  }

  componentDidMount() {
    this.getArt();
  }

  getArt(pageIndex = this.state.pageIndex) {
    if (!this.areItemsInCache(pageIndex)) {
      // Dispatch an action (Redux)
      this.props.getListArt(pageIndex, this.ROWS_PER_PAGE);
    }
  }

  // Returns false if the 'cache' is empty
  areItemsInCache(pageIndex) {
    for (let artItem of this.props.artList) {
      // If the requested pageNumber is already in our Redux state variable 'artList',
      // we return so we avoid executing the next statement, which is sending a new GET request
      // => by using a for loop & if statement, we don't necessarily have to iterate over the whole array to finish
      if (artItem.pageNumber === pageIndex) {
        return true;
      }
    }
    return false;
  }

  paginationHandler(event, newPage) {
    this.setState({ pageIndex: newPage });
    this.getArt(newPage);
  }

  artItemClickedHandler(objectNumber) {
    // Push a new URL (consisting of the objectNumber variable) to the 'stack'
    // Using this method, we still allow the use of the back button by the user
    this.props.history.push(`/collection/${objectNumber}`);
  }

  render() {
    /* 
    Default CASE
    ------------
    => We show a loading indicator.    
    */

    let table = <CircularProgress />;

    /* 
    CASE: our listArt reducer state constains an error value
    ---------------------------------------------------------
    => We display the error object's corresponding error message
    */

    if (this.props.error) {
      table = <p>{this.props.error.message}</p>;

      /*
      CASE: 
      - our state contains art results (this.props.artList is 'truthy')
        &&
      - there is no request pending (this.props.loading is not null)
      -----------------------------------------------------------------
      => We display the table with results
    */
    } else if (this.props.artList && !this.props.loading) {
      table = (
        <ArtTable
          artList={this.props.artList}
          pageIndex={this.state.pageIndex}
          rowClicked={this.artItemClickedHandler}
          paginationClicked={this.paginationHandler}
        />
      );
    }

    return table;
  }
}

const mapStateToProps = state => {
  return {
    loading: state.listArt.loading,
    artList: state.listArt.artList,
    error: state.listArt.error
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
)(ArtList);
