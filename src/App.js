/* ===== *\
   React
\* ===== */
import React from "react";

/* =========== *\
   react-router
\* =========== */
import { Route, Switch } from "react-router-dom";

// Internal imports
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import Header from "./components/Header/Header";
import ArtList from "./containers/ArtList/ArtList";

function App() {
  return (
    <div className="App">
      <Layout header={<Header />}>
        <Switch>
          <Route path="/" exact component={ArtList} />
          <Route path="/:objectNumber" exact component={ArtList} />
        </Switch>
      </Layout>
    </div>
  );
}

export default App;
