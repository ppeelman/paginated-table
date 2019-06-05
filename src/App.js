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
import Homepage from "./components/Homepage/Homepage";
import ArtDetail from "./containers/ArtDetail/ArtDetail";

function App() {
  return (
    <div className="App">
      <Switch>
        <Route
          path="/"
          exact
          render={routeProps => <Homepage routeProps={routeProps} />}
        />
        <Route path="/collection/:objectNumber" exact component={ArtDetail} />
      </Switch>
    </div>
  );
}

export default App;
