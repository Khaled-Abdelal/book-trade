import React, { useEffect, useState } from 'react'
import qs from 'qs'
import Axios from 'axios';
import BookList from '../BookList/BookList';
import { Container, Spinner } from "reactstrap";


const baseURL = process.env.REACT_APP_BASE_URL || '';


function SearchBooks({ location }) {
    const [books, setBooks] = useState([])
    const [loading, setLoading] = useState(false)
    const { q } = qs.parse(location.search, { ignoreQueryPrefix: true });
    useEffect(() => {
        async function getSearchedBooks() {
            try {
                setLoading(true)
                const res = await Axios.get(`${baseURL}/api/books/search?q=${q}`);
                const books = res.data;
                setBooks(books)
                setLoading(false)
                console.log(books)
            } catch (e) {
                setLoading(false)
            }
        }
        getSearchedBooks()
    }, [q])
    return (
        <div className="Browse">
            <Container>
                <h3 className="Browse-title">Search</h3>
                {loading ? <div className="d-flex justify-content-center"><Spinner color="secondery" /></div> : <BookList books={books} />}
            </Container>
        </div>
    )
}

export default SearchBooks
