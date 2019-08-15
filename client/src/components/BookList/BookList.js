import React, { useState } from "react";
import { Row, Col } from "reactstrap";
import StarRatings from "react-star-ratings";
import BookDetails from '../BookDetails/BookDetails'
import useToggle from '../../hooks/useToggle'
import Color from 'color'
import "./BookList.scss";

function BookList({ books }) {
  const [modalValue, toggler] = useToggle();
  const [bookInModal, toggleBookInModal] = useState(null)
  return (
    <Row className="BookList">
      {books.map(book => {
        let colorEmbtyColor = Color(book.dominantColor).alpha(.4).lighten(.7).string()
        let starRatedColor = Color(book.dominantColor).string()
        return (
          <Col key={book._id} sm="6" xs="12" md="4" className="BookList-single" onClick={() => { toggleBookInModal(book); toggler() }}>

            <img className="BookList-thumbnail" src={book.cover.thumbnail} alt={book.title} />

            <div className="BookList-info">
              <p className="BookList-info-title">{book.title}</p>
              <p className="BookList-info-author">{book.authors[0] ? book.authors[0] : 'Not known'}</p>
              <div className="BookList-info-starRatings">
                <StarRatings
                  rating={book.averageRating}
                  starRatedColor={starRatedColor}
                  starEmptyColor={colorEmbtyColor}
                  numberOfStars={5}
                  starDimension="13px"
                  starSpacing="2px"
                />
              </div>
            </div>
          </Col>
        );
      })}
      {bookInModal && <BookDetails book={bookInModal} modalValue={modalValue} toggler={toggler} />}
    </Row>
  );
}

export default BookList;

