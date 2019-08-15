import React from 'react'
import StarRatings from "react-star-ratings";
import { Container, Row, Col } from 'reactstrap';
import Color from 'color'
import './BookDetails.scss'


import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';



function BookDetails({ book, modalValue, toggler }) {
    let colorEmbtyColor = Color(book.dominantColor).alpha(.4).lighten(.7).string()
    let starRatedColor = Color(book.dominantColor).string()
    return (
        <Modal isOpen={modalValue} toggle={toggler} size='lg'>
            <ModalHeader toggle={toggler}>Book Details</ModalHeader>
            <ModalBody>
                <div className="BookDetails">
                    <Container>
                        <Row>
                            <Col md="4"><img className="BookDetails-cover" src={changeCoverImageSize(book.cover.thumbnail)} alt={book.title} /></Col>
                            <Col md="8" className="BookList-info">
                                <p className="BookDetails-info-title">{book.title}</p>
                                <p className="BookDetails-info-author">{book.authors[0] ? `by ${book.authors[0]}` : 'Not known'}</p>
                                <div className="BookDetails-info-starRatings">
                                    <StarRatings
                                        rating={book.averageRating}
                                        starRatedColor={starRatedColor}
                                        starEmptyColor={colorEmbtyColor}
                                        numberOfStars={5}
                                        starDimension="13px"
                                        starSpacing="2px"
                                    />
                                </div>
                                <p className="BookDetails-info-description">{book.description}</p>
                                <p>owner <img src={book.owner.photo} />{book.owner.name}</p>
                            </Col>
                        </Row>
                    </Container>
                </div >
            </ModalBody>
            <ModalFooter>
                <Button color="primary" onClick={toggler}>Do Something</Button>{' '}
                <Button color="secondary" onClick={toggler}>Cancel</Button>
            </ModalFooter>
        </Modal>
    )
}

export default BookDetails

function changeCoverImageSize(url) {
    url = url.replace('zoom=1', 'zoom=2')
    return url
}