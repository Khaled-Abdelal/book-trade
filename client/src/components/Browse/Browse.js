import React, { useEffect, useState, Fragment } from "react";
import BookList from "../BookList/BookList";
import axios from "axios";
import { Container, Pagination, PaginationItem, PaginationLink, Spinner } from "reactstrap";
import "./Browse.scss";

const baseURL = process.env.REACT_APP_BASE_URL || '';

function Browse() {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState({ page: 1, skip: 0 })
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    async function getBooks() {
      try {
        setLoading(true)
        const books = await axios.get(`${baseURL}/api/books?sortBy=createdAt:desc&limit=9&skip=${page.skip}`);
        setBooks(books.data);
        setLoading(false)
      } catch (err) {
        setLoading(false)
      }
    }
    getBooks();
  }, [page]);

  function changePage(page) {
    console.log(page)
    const skip = (page - 1) * 9;
    setPage({ page, skip })

  }
  return (
    <div className="Browse">
      <Container>
        <h3 className="Browse-title">Browse</h3>
        {loading ? <div className="d-flex justify-content-center"><Spinner color="secondery" /></div> : <Fragment><BookList books={books} /> <Pagination size="sm" aria-label="Page navigation example">
          <PaginationItem>
            <PaginationLink first onClick={() => changePage(1)} />
          </PaginationItem>
          <PaginationItem disabled={page.page === 1 ? true : false}>
            <PaginationLink previous onClick={() => changePage((page.page) - 1)} />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink onClick={() => changePage((page.page))}>
              {page.page}
            </PaginationLink>
          </PaginationItem>
          <PaginationItem disabled={books.length === 0 ? true : false}>
            <PaginationLink next onClick={() => changePage((page.page) + 1)} />
          </PaginationItem>
        </Pagination></Fragment>}

      </Container>
    </div>
  );
}

export default Browse;
