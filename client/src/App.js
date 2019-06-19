import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import BookCarousel from "./components/BookCarousel/BookCarousel";

function App() {
  return (
    <div className="App">
      <NavBar />
      <BookCarousel />
    </div>
  );
}

export default App;
