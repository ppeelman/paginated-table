import React from "react";

import Layout from "../../hoc/Layout/Layout";
import Header from "../Header/Header";
import ArtListContainer from "../../containers/ArtListContainer/ArtListContainer";

const Homepage = ({ children, routeProps }) => {
  return (
    <Layout header={<Header />}>
      <ArtListContainer {...routeProps} />
    </Layout>
  );
};

export default Homepage;
