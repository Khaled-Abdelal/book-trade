import React, { useState, Fragment } from "react";
import { Row, Col } from "reactstrap";
import StarRatings from "react-star-ratings";
import BookDetails from '../BookDetails/BookDetails'
import useToggle from '../../hooks/useToggle'
import Color from 'color'
import "./BookList.scss";
import useBookDetailModal from "../../hooks/useBookDetailModal";

function BookList({ books }) {
  const [toggler, modalState, changeBookInModal, bookInModal] = useBookDetailModal()

  function renderList() {
    if (books.length > 0) {
      return (
        <Fragment>
          {
            books.map(book => {
              let colorEmbtyColor = Color(book.dominantColor).alpha(.4).lighten(.7).string()
              let starRatedColor = Color(book.dominantColor).string()
              return (
                <Col key={book._id} sm="6" xs="12" md="4" className="BookList-single" onClick={() => { changeBookInModal(book); toggler() }}>

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
          <BookDetails book={bookInModal} modalValue={modalState} toggler={toggler} />
        </Fragment>
      )
    } else {
      return (<p className="BookList-noBooks">No books to show:</p>)
    }
  }
  return (
    <Row className="BookList">
      {renderList()}
    </Row>
  );
}

export default BookList;

