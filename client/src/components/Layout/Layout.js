import React from "react";
import BookCarousel from "../BookCarousel/BookCarousel";
import Owners from "../Owners/Owners";
import NavBar from "../NavBar/NavBar";
import { Container, Row, Col } from "reactstrap";
function Layout({ children }) {
  return (
    <div>
      <NavBar />
      <BookCarousel />
      <Container>
        <Row>
          <Col md="8">{children}</Col>
          <Col md="4">
            <Owners />
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default Layout;
