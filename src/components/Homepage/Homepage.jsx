import React from "react";
import PropTypes from "prop-types";

import Layout from "../../hoc/Layout/Layout";
import Header from "../Header/Header";
import ArtListContainer from "../../containers/ArtListContainer/ArtListContainer";

const Homepage = ({ routeProps }) => {
  return (
    <Layout header={<Header />}>
      <ArtListContainer {...routeProps} />
    </Layout>
  );
};

Homepage.propTypes = {
  routeProps: PropTypes.object.isRequired
};

export default Homepage;
