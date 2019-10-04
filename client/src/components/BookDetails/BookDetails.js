import React, { useContext, Fragment } from 'react'
import StarRatings from "react-star-ratings";
import { Container, Row, Col } from 'reactstrap';
import { AuthStateContext } from '../../context/auth.context'
import Color from 'color'
import './BookDetails.scss'
import { Link } from 'react-router-dom'
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Axios from 'axios';


const baseURL = process.env.REACT_APP_BASE_URL;

function BookDetails({ book, modalValue, toggler }) {
    const authUser = useContext(AuthStateContext)


    async function sendTradeRequest(requestedBook, authUser) {
        const token = JSON.parse(localStorage.getItem("auth-token"));
        const currentOwner = requestedBook.owner._id;
        const requestor = authUser._id;
        const book = requestedBook._id;
        try {
            const res = await Axios.post(`${baseURL}/api/trade`, { currentOwner, requestor, book }, { headers: { Authorization: `Bearer ${token}` } })
            toggler()
        } catch (e) {
            console.log(e)
        }
    }

    function renderDetails() {
        if (book === null) return null;
        let colorEmbtyColor = Color(book.dominantColor).alpha(.4).lighten(.7).string()
        let starRatedColor = Color(book.dominantColor).string()
        return (
            <Fragment>
                {book !== null ? <Modal isOpen={modalValue} toggle={toggler} size='lg'>
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
                                        <p>owner <img className="avatar BookDetails-avatar" src={book.owner.photo} /><Link to={`/profile/${book.owner._id}`}>{book.owner.name}</Link></p>
                                    </Col>
                                </Row>
                            </Container>
                        </div >
                    </ModalBody>
                    <ModalFooter>
                        {authUser.loggedIn && authUser.user._id != book.owner._id && <Button color="primary" onClick={() => sendTradeRequest(book, authUser.user)}>Request Book</Button>}
                        <Button color="secondary" onClick={toggler}>Cancel</Button>
                    </ModalFooter>
                </Modal> : null}

            </Fragment>
        )

    }
    return (
        renderDetails()
    )
}

export default BookDetails





function changeCoverImageSize(url) {
    url = url.replace('zoom=1', 'zoom=2')
    return url
}



