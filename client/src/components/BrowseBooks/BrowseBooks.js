import React, { useEffect, useState } from "react";
import BookList from "../BookList/BookList";
import axios from "axios";

const baseURL = process.env.REACT_APP_BASE_URL;

function BrowseBooks() {
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
      <h3>Browse</h3>
      <BookList books={books} />
    </div>
  );
}

export default BrowseBooks;
