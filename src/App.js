/* ===== *\
   React
\* ===== */
import React, { Suspense } from "react";

/* =========== *\
   react-router
\* =========== */
import { Route, Switch } from "react-router-dom";

/* =========== *\
   Material-UI
\* =========== */
import CircularProgress from "@material-ui/core/CircularProgress";

/* ================ *\
   Internal imports
\* ================ */
import Homepage from "./components/Homepage/Homepage";
// Lazy loading
const ArtDetailContainer = React.lazy(() =>
  import("./containers/ArtDetailContainer/ArtDetailContainer")
);

function App() {
  /* 3 routes:
   -----------
   1. At the root URL, we navigate to the Homepage
   2. At /collection/:objectNumber URLs, we navigate to the ArtDetail page
   3. For other cases not matched by 1) and 2), we load the Homepage again 
*/

  return (
    <div className="App">
      <Switch>
        <Route
          path="/"
          exact
          render={routeProps => <Homepage routeProps={routeProps} />}
        />
        <Route
          path="/collection/:objectNumber"
          exact
          render={routeProps => (
            <Suspense fallback={<CircularProgress size={100} />}>
              <ArtDetailContainer {...routeProps} />
            </Suspense>
          )}
        />
        <Route render={routeProps => <Homepage routeProps={routeProps} />} />
      </Switch>
    </div>
  );
}

export default App;
