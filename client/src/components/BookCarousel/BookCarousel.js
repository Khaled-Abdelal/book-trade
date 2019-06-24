import React, { useState, useEffect } from "react";
import axios from "axios";
import { Carousel, CarouselItem } from "reactstrap";

const baseUrl = process.env.REACT_APP_BASE_URL;

function BookCarousel() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [carouselBooks, setCarouselBooks] = useState([]);
  useEffect(() => {
    console.log(baseUrl);
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
  function next() {
    if (animating) return;
    const nextIndex =
      activeIndex === carouselBooks.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  }

  function previous() {
    if (animating) return;
    const nextIndex =
      activeIndex === 0 ? carouselBooks.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const slides = carouselBooks.map(book => {
    return (
      <CarouselItem
        onExiting={() => {
          setAnimating(true);
        }}
        onExited={() => {
          setAnimating(false);
        }}
        key={book._id}
      >
        <img src={book.cover} alt={book.description} />
        <h3>{book.title}</h3>
        <p>{book.authors[0]}</p>
      </CarouselItem>
    );
  });

  return (
    <div>
      <Carousel activeIndex={activeIndex} next={next} previous={previous}>
        {slides}
      </Carousel>
    </div>
  );
}

export default BookCarousel;
