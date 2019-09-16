import React, { useEffect, useState, useContext } from 'react'
import BookList from '../BookList/BookList'
import BookDetails from "../BookDetails/BookDetails";
import { Link } from 'react-router-dom'
import useToggle from '../../hooks/useToggle'
import { AuthStateContext } from '../../context/auth.context'
import { Container, Table, Button } from 'reactstrap'
import Axios from 'axios';
import './profile.scss'

const baseURL = process.env.REACT_APP_BASE_URL;

function Profile({ match }) {
    const [books, setBooks] = useState([]);
    const [user, setUser] = useState([]);
    const [requests, setRequests] = useState([])
    const [modalValue, toggler] = useToggle();
    const [bookInModal, toggleBookInModal] = useState(null)
    const profileId = match.params.id
    const authUser = useContext(AuthStateContext)

    useEffect(() => {
        async function getUserData() {
            try {
                const res = await Axios.get(`${baseURL}/api/users/${profileId}`)
                const { books, user } = res.data;
                setBooks(books)
                setUser(user)
            } catch (e) {
                console.log(e)
            }

        }
        getUserData()
    }, [profileId])

    useEffect(() => {
        async function getRequests() {

            if (!(authUser.loggedIn && (profileId === authUser.user._id))) return

            const token = JSON.parse(localStorage.getItem("auth-token"));
            try {
                const res = await Axios.get(`${baseURL}/api/trade/${profileId}`, { headers: { Authorization: `Bearer ${token}` } })
                const requests = res.data
                setRequests(requests)
            } catch (e) {
                console.log(e)
            }
        }
        getRequests()
    }, [authUser.loggedIn])


    function renderRequests() {
        if (!(authUser.loggedIn && (profileId === authUser.user._id))) return null
        return (
            <div className=''>
                <Table>
                    <thead>
                        <tr>
                            <th>Requestor</th>
                            <th>Book</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {requests.length == 0 ? <tr><td colSpan="3"><p className='Profile-noRequests'>You havn't received any book requests</p></td></tr> :
                            requests.filter(request => {
                                return request.currentOwner._id === authUser.user._id
                            }).map(request => {

                                return (

                                    <tr>
                                        <td><Link className="Profile-request-owner" to={`/profile/${request.requestor._id}`}>{request.requestor.name}</Link></td>
                                        <td className="Profile-request-bookName" onClick={() => { toggleBookInModal(request.book); toggler() }}>{request.book.title}</td>
                                        <td><Button onClick={() => acceptTrade(request._id)}>accept</Button>{'  '}<Button onClick={() => refuseTrade(request._id)}>refuse</Button></td>
                                    </tr>


                                )
                            }

                            )

                        }
                    </tbody>
                </Table>
                {bookInModal && <BookDetails book={bookInModal} modalValue={modalValue} toggler={toggler} />}

            </div>
        )

    }

    async function acceptTrade(tradeId) {
        try {
            const token = JSON.parse(localStorage.getItem("auth-token"));
            const res = await Axios.put(`${baseURL}/api/trade/accept`, { tradeId }, { headers: { Authorization: `Bearer ${token}` } })
            setRequests(requests.filter((request) => {
                return request._id !== tradeId;
            }))
            setBooks(books.filter(book => {
                return res.data.book !== book._id
            }))
        } catch (err) {
            console.log(err, 'error')
        }
    }
    async function refuseTrade(tradeId) {
        try {
            const token = JSON.parse(localStorage.getItem("auth-token"));
            const res = await Axios.put(`${baseURL}/api/trade/refuse`, { tradeId }, { headers: { Authorization: `Bearer ${token}` } })
            setRequests(requests.filter((request) => {
                return request._id != tradeId;
            }))
        } catch (err) {
            console.log(err, 'error')
        }
    }
    return (
        <div>
            {renderRequests()}
            <div className="Profile-listing">
                <Container>
                    <h3 className="Profile-Owner">{user.name}'s books</h3>
                    <BookList books={books} />
                </Container>
            </div>
        </div>
    )
}

export default Profile
