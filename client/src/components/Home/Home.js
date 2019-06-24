import React, { useEffect, useState } from "react";
import BookCarousel from "../BookCarousel/BookCarousel";
import BookList from "../BookList/BookList";
import axios from "axios";
import Owners from "../Owners/Owners";
const baseURL = process.env.REACT_APP_BASE_URL;

function Home() {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    async function getBooks() {
      try {
        const books = await axios.get(`${baseURL}/api/books`);
        setBooks(books.data);
      } catch (err) {
        console.log(err);
      }
    }
    getBooks();
  }, []);
  return (
    <div>
      <BookCarousel />
      <h3>Browse</h3>
      <BookList books={books} />
      <Owners />
    </div>
  );
}

export default Home;
