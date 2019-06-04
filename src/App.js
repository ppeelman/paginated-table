// External imports
import React from "react";

// Internal imports
import "./App.css";
import Layout from "./hoc/Layout/Layout";
import Header from "./components/Header/Header";
import ArtList from "./containers/ArtList/ArtList";

function App() {
  return (
    <div className="App">
      <Layout header={<Header />}>
        <ArtList />
      </Layout>
    </div>
  );
}

export default App;
