import React, { useState, useEffect } from "react";
import axios from "axios";
import "./BookCarousel.scss";
import Slider from "react-slick";
import { Container } from "reactstrap";

const baseUrl = process.env.REACT_APP_BASE_URL;

function BookCarousel() {
  const [carouselBooks, setCarouselBooks] = useState([]);
  useEffect(() => {
    async function loadCarouselBooks() {
      try {
        const books = await axios.get(`${baseUrl}/api/books?limit=5`);
        setCarouselBooks(books.data);
      } catch (err) {
        console.log(err);
      }
    }
    loadCarouselBooks();
  }, []);

  const slides = carouselBooks.map((book, index) => {
    let colors = ["#fbcfd1", "#d5cdfe", "#9edafd"];
    let color = colors[index % 3];
    return (
      <React.Fragment key={book._id}>
        <div className="BookCarousel-slide" style={{ background: color }}>
          <img
            className="BookCarousel-slide-cover"
            src={book.cover.thumbnail}
            alt={`${book.title} cover`}
          />
          <div className="BookCarousel-slide-info">
            <h3 className="BookCarousel-slide-title">{book.title}</h3>
            <p className="BookCarousel-slide-author">{`by ${
              book.authors[0]
            }`}</p>
            <p>{book.averageRating}</p>
            <p>{book.ratingsCount}</p>
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
    className: "center"
  };
  return (
    <div className="BookCarousel">
      <Container>
        <h3 className="BookCarousel-title">For You</h3>
      </Container>
      <Slider {...settings}>{slides}</Slider>
    </div>
  );
}

export default BookCarousel;
