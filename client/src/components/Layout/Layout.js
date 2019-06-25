import React from "react";
import BookCarousel from "../BookCarousel/BookCarousel";
import Owners from "../Owners/Owners";
import NavBar from "../NavBar/NavBar";
function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <BookCarousel />
      {children}
      <Owners />
    </div>
  );
}

export default Layout;
