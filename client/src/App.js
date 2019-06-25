import React from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";

function App() {
  return (
    <div className="App">
      <Layout>
        <Home />
      </Layout>
    </div>
  );
}

export default App;
