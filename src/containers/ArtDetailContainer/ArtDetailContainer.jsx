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

// Internal imports
import LoadResources from "../LoadResources/LoadResources";
import ArtDetail from "../../components/ArtDetail/ArtDetail";

class ArtDetailContainer extends Component {
  constructor(props) {
    super(props);

    // Get objectnumber from URL
    const pathNameList = this.props.history.location.pathname.split("/");
    this.objectNumber = pathNameList[pathNameList.length - 1];
  }

  render() {
    return (
      <LoadResources
        loadFunction={() => this.props.getArtDetail(this.objectNumber)}
        dataLocation={this.props.artDetail[this.objectNumber]}
        render={dataList => <ArtDetail {...dataList} />}
        error={this.props.error}
        loading={this.props.loading}
      />
    );
  }
}

ArtDetailContainer.propTypes = {
  // Redux props
  artDetail: PropTypes.object.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.object,
  getArtDetail: PropTypes.func.isRequired,

  // React-router props
  history: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  match: PropTypes.object.isRequired
};

const mapStateToProps = state => {
  return {
    artDetail: state.artDetail.artDetail,
    loading: state.artDetail.loading,
    error: state.artDetail.error
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
)(ArtDetailContainer);
