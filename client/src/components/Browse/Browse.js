import React, { useEffect, useState } from "react";
import BookList from "../BookList/BookList";
import axios from "axios";
import { Container } from "reactstrap";
import "./Browse.scss";

const baseURL = process.env.REACT_APP_BASE_URL;

function Browse() {
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
    <div className="Browse">
      <Container>
        <h3 className="Browse-title">Browse</h3>
        <BookList books={books} />
      </Container>
    </div>
  );
}

export default Browse;
