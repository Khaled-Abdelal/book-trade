import React from "react";
import "./App.css";
import NavBar from "./components/NavBar/NavBar";
import BookCarousel from "./components/BookCarousel/BookCarousel";
import BrowseBooks from "./components/BrowseBooks/BrowseBooks";

function App() {
  return (
    <div className="App">
      <NavBar />
      <BookCarousel />
      <BrowseBooks />
    </div>
  );
}

export default App;
