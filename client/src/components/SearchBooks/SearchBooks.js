import React, { useEffect, useState } from 'react'
import qs from 'qs'
import Axios from 'axios';
import BookList from '../BookList/BookList';
import { Container } from "reactstrap";


const baseURL = process.env.REACT_APP_BASE_URL;


function SearchBooks({ location }) {
    const [books, setBooks] = useState([])
    const { q } = qs.parse(location.search, { ignoreQueryPrefix: true });
    useEffect(() => {
        async function getSearchedBooks() {
            const res = await Axios.get(`${baseURL}/api/books/search?q=${q}`);
            const books = res.data;
            setBooks(books)
            console.log(books)
        }
        getSearchedBooks()
    }, [q])
    return (
        <div className="Browse">
            <Container>
                <h3 className="Browse-title">Search</h3>
                <BookList books={books} />
            </Container>
        </div>
    )
}

export default SearchBooks
