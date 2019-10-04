import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookCarousel.scss";
import Slider from "react-slick";
import Color from "color";
import StarRatings from "react-star-ratings";
import { Container, Badge } from "reactstrap";
import BookDetails from '../BookDetails/BookDetails'
import useBookDetailModal from '../../hooks/useBookDetailModal'

const baseUrl = process.env.REACT_APP_BASE_URL;

function BookCarousel() {
  const [carouselBooks, setCarouselBooks] = useState([]);
  const [toggler, modalState, changeBookInModal, bookInModal] = useBookDetailModal();
  const [dragging, setDragging] = useState(false)

  useEffect(() => {
    async function loadCarouselBooks() {
      try {
        const books = await axios.get(`${baseUrl}/api/books?limit=10&sortBy=createdAt:desc`);
        setCarouselBooks(books.data);
        console.log(books)
      } catch (err) {
        console.log(err);
      }
    }
    loadCarouselBooks();
  }, []);

  function handleClick(e, book) {
    if (dragging) {
      e.preventDefault()
    } else {
      changeBookInModal(book);
      toggler();
    }
  }
  const slides = carouselBooks.map((book, index) => {

    return (
      <React.Fragment key={book._id} >
        <div
          onClick={(e) => handleClick(e, book)}
          className="BookCarousel-slide"
          style={{
            backgroundImage: `linear-gradient(to top,${
              Color(book.dominantColor).alpha(0.6)
              }, ${Color(book.dominantColor).alpha(0.7)})`
          }}
        >
          <img
            className="BookCarousel-slide-cover"
            src={book.cover.thumbnail}
            alt={`${book.title} cover`}
          />
          <div className="BookCarousel-slide-info">
            <h3
              className="BookCarousel-slide-title"
              style={{ textShadow: `0 0 10px ${Color(book.dominantColor).darken(.2)}` }}
            >
              {book.title}
            </h3>
            <p
              className="BookCarousel-slide-author"
              style={{ textShadow: `0 0 10px ${Color(book.dominantColor).darken(.2)}` }}
            >{`by ${book.authors[0] ? book.authors[0] : "Not known"}`}</p>
            <div className="BookCarousel-rating">
              <StarRatings
                rating={book.averageRating}
                starRatedColor="white"
                starEmptyColor={Color(book.dominantColor).darken(0.2)}
                numberOfStars={5}
                starDimension="25px"
                starSpacing="5px"
              />
            </div>
            <Badge
              className="avatar BookCarousel-badge"
              style={{
                color: Color(book.dominantColor).darken(0.3),
                background: "#fff"
              }}
            >
              +{book.ratingsCount ? book.ratingsCount : "0"}
            </Badge>
          </div>
        </div>
      </React.Fragment>
    );
  });

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    className: "center",
    autoplay: true,
    speed: 600,
    autoplaySpeed: 2000,
    cssEase: "linear",
    beforeChange: () => setDragging(true),
    afterChange: () => setDragging(false),
    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1

        }
      }
    ]
  };
  return (
    <div className="BookCarousel">
      <Container>
        <h3 className="BookCarousel-title">For You</h3>
      </Container>
      <Slider {...settings}>{slides}</Slider>
      <BookDetails book={bookInModal} modalValue={modalState} toggler={toggler} />}

    </div>
  );
}

export default BookCarousel;
