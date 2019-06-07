// React imports
import React from "react";
import ReactDOM from "react-dom";

// react-router
import { BrowserRouter } from "react-router-dom";

// Redux
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import listArtReducer from "./store/reducers/listArt.js";
import artDetailReducer from "./store/reducers/artDetail.js";

import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";

// Redux devtool extension
// https://github.com/zalmoxisus/redux-devtools-extension
const composeEnhancers =
  process.env.NODE_ENV === "development"
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    : null || compose;

const rootReducer = combineReducers({
  listArt: listArtReducer,
  artDetail: artDetailReducer
});

// Apply 'thunk' as middleware to allow asynchronous actions (such as HTTP requests)
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter basename="/paginated-table-github-pages">
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
