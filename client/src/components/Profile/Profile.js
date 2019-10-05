import React, { useEffect, useState, useContext, Fragment } from 'react'
import BookList from '../BookList/BookList'
import BookDetails from "../BookDetails/BookDetails";
import { Link } from 'react-router-dom'
import { AuthStateContext } from '../../context/auth.context'
import { Container, Table, Button, Spinner } from 'reactstrap'
import Axios from 'axios';
import { toast } from 'react-toastify';
import useBookDetailModal from '../../hooks/useBookDetailModal'
import './profile.scss';

const baseURL = process.env.REACT_APP_BASE_URL;

function Profile({ match }) {
    const [books, setBooks] = useState([]);
    const [user, setUser] = useState([]);
    const [requests, setRequests] = useState([])
    const [toggler, modalValue, toggleBookInModal, bookInModal] = useBookDetailModal()
    const [loadingBooks, setLoadingBooks] = useState(false)
    const [loadingRequests, setLoadingRequests] = useState(false)

    const profileId = match.params.id
    const authUser = useContext(AuthStateContext)

    useEffect(() => {
        async function getUserData() {
            try {
                setLoadingBooks(true)
                const res = await Axios.get(`${baseURL}/api/users/${profileId}`)
                const { books, user } = res.data;
                setBooks(books)
                setUser(user)
                setLoadingBooks(false)
            } catch (e) {
                setLoadingBooks(false)
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
                setLoadingRequests(true)
                const res = await Axios.get(`${baseURL}/api/trade/${profileId}`, { headers: { Authorization: `Bearer ${token}` } })
                const requests = res.data
                setRequests(requests)
                setLoadingRequests(false)
            } catch (e) {
                setLoadingRequests(false)
                console.log(e)
            }
        }
        getRequests()
    }, [authUser.loggedIn, authUser, user._id, profileId])


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
                        {loadingRequests ?
                            <tr><td colSpan="3">
                                <div className="d-flex justify-content-center">
                                    <Spinner color="secondery" />
                                </div>
                            </td></tr> :
                            requests.length === 0 ? <tr><td colSpan="3"><p className='Profile-noRequests'>You havn't received any book requests</p></td></tr> :
                                requests.filter(request => {
                                    return request.currentOwner._id === authUser.user._id
                                }).map(request => {

                                    return (

                                        <tr>
                                            <td><Link className="Profile-request-owner" to={`/profile/${request.requestor._id}`}>{request.requestor.name}</Link></td>
                                            <td className="Profile-request-bookName" onClick={() => { toggleBookInModal(request.book); toggler() }}>{request.book.title}</td>
                                            <td className="Profile-request-accept-refuse"><Button onClick={() => acceptTrade(request._id)}>accept</Button>{'  '}<Button onClick={() => refuseTrade(request._id)}>refuse</Button></td>
                                        </tr>


                                    )
                                }

                                )

                        }
                    </tbody>
                </Table>
                {<BookDetails book={bookInModal} modalValue={modalValue} toggler={toggler} />}

            </div >
        )

    }

    async function acceptTrade(tradeId) {
        try {
            const token = JSON.parse(localStorage.getItem("auth-token"));
            setLoadingRequests(true)

            const res = await Axios.put(`${baseURL}/api/trade/accept`, { tradeId }, { headers: { Authorization: `Bearer ${token}` } })
            setRequests(requests.filter((request) => {
                return request._id !== tradeId;
            }))
            toast.success("Operation Successful !");
            setBooks(books.filter(book => {
                return res.data.book !== book._id
            }))
            setLoadingRequests(false)

        } catch (err) {
            setLoadingRequests(false)
            toast.error("Operation Failed !");

        }
    }
    async function refuseTrade(tradeId) {
        try {
            const token = JSON.parse(localStorage.getItem("auth-token"));
            setLoadingRequests(true)
            await Axios.put(`${baseURL}/api/trade/refuse`, { tradeId }, { headers: { Authorization: `Bearer ${token}` } })
            setRequests(requests.filter((request) => {
                return request._id !== tradeId;
            }))
            toast.success("Operation Successful !");
            setLoadingRequests(false)

        } catch (err) {
            setLoadingRequests(false)
            toast.error("Operation Failed !");


        }
    }
    return (
        <div>
            {renderRequests()}
            <div className="Profile-listing">
                <Container>
                    {
                        loadingBooks ?
                            <div className='d-flex justify-content-center'><Spinner color="secondery" /></div>
                            :
                            <Fragment><h3 className="Profile-Owner">{user.name}'s books</h3><BookList books={books} /></Fragment>
                    }
                </Container>
            </div>
        </div >
    )
}

export default Profile
