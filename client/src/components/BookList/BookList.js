import React from "react";
import { Container, Row, Col } from "reactstrap";

function BookList({ books }) {
  return (
    <Container>
      <Row>
        {books.map(book => {
          return (
            <Col key={book._id} xs="6" md="4">
              <Container>
                <Row>
                  <Col xs="4">
                    <img src={book.cover} alt={book.description} />
                  </Col>
                  <Col xs="8">
                    <p>{book.title}</p>
                    {book.authors.map(author => {
                      return <p key={author}>{author}</p>;
                    })}
                  </Col>
                </Row>
              </Container>
            </Col>
          );
        })}
      </Row>
    </Container>
  );
}

export default BookList;
