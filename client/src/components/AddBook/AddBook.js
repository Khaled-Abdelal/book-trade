import React, { useState } from "react";
import axios from "axios";
import { Input, Button } from "reactstrap";
import StarRatings from "react-star-ratings";
import { toast } from 'react-toastify';
import './AddBook.scss'

const base_url = process.env.REACT_APP_BASE_URL || '';

function AddBook() {
  const [searchedBooks, setSearchedBooks] = useState([]);
  async function updateList(e) {
    e.preventDefault();
    const { data: books } = await axios.get(
      `https://www.googleapis.com/books/v1/volumes?q=${e.target.value}`
    );
    setSearchedBooks(books.items);
    console.log(books);
  }
  async function addBook(book) {
    const { volumeInfo } = book;
    const { title, description, authors, imageLinks, averageRating, ratingsCount } = volumeInfo;
    const postedData = {
      title,
      authors,
      description,
      ratingsCount,
      averageRating,
      cover: imageLinks,
    }
    try {
      const token = JSON.parse(localStorage.getItem("auth-token"));
      await axios.post(`${base_url}/api/books`, postedData, { headers: { Authorization: `Bearer ${token}` } })
      toast.success("Operation Successful !");
    } catch (err) {
      toast.error("Operation Failed !");

    }
  }
  return (
    <div className="AddBook">
      <Input className='AddBook-search' type="text" onChange={updateList} placeholder="add a new book" />
      {searchedBooks ?
        <React.Fragment>
          {
            searchedBooks.map(book => {
              return (
                <div className="AddBook-section">
                  <img
                    className="AddBook-bookImg"
                    src={
                      book.volumeInfo.imageLinks
                        ? book.volumeInfo.imageLinks.smallThumbnail
                        : null
                    }
                    alt={book.volumeInfo.title}
                  />
                  <div className="AddBook-info">
                    <h3 className="AddBook-title">{book.volumeInfo.title}</h3>
                    <p className='AddBook-author'>{book.volumeInfo.authors ? `by ${book.volumeInfo.authors[0]}` : null}</p>
                    <p className="AddBook-ratings">{book.volumeInfo.averageRating ? <StarRatings rating={book.volumeInfo.averageRating}
                      starRatedColor="black"
                      starEmptyColor="#a8a8a8"
                      numberOfStars={5}
                      starDimension="20px"
                      starSpacing="3px" /> : null}</p>
                    <Button outline className='AddBook-submit' onClick={() => addBook(book)}>Add Book</Button>
                  </div>

                </div>
              );
            })
          }
        </React.Fragment>
        : <div className='AddBook-noBookFound'><p>no books found with this name</p></div>}
    </div>
  );
}

export default AddBook;
