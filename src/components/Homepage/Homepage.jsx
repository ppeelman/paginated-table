import React from "react";

import Layout from "../../hoc/Layout/Layout";
import Header from "../Header/Header";
import ArtList from "../../containers/ArtList/ArtList";

const Homepage = ({ children, routeProps }) => {
  return (
    <Layout header={<Header />}>
      <ArtList {...routeProps} />
    </Layout>
  );
};

export default Homepage;
