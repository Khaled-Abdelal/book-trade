import React, { useContext, useEffect } from "react";
import qs from 'qs'
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import useToggle from "../../hooks/useToggle";
import "./NavBar.scss";
import logo from "../../assets/book-icon.svg";
import { FaSearch } from "react-icons/fa";
import { Link, withRouter } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Input,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Container
} from "reactstrap";
import {
  AuthStateContext,
  AuthDispatchContext
} from "../../context/auth.context";
import Axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;

function NavBar({ history, location }) {
  const [menuToggle, menuToggler] = useToggle(false);
  const [modalToggle, modalToggler] = useToggle(false);


  const authState = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);

  const { q } = qs.parse(location.search, { ignoreQueryPrefix: true });
  function handleSearch(e) {
    if (e.target.value === '') return history.push('/');
    history.push(`/search?q=${e.target.value}`)
  }

  function renderAuth() {
    switch (authState.loggedIn) {
      case false:
        return (
          <Button color="danger" onClick={modalToggler}>
            SignUp/Login
          </Button>
        );
      case true:
        return (
          <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav>
              <img
                src={authState.user.photo}
                className="avatar"
                alt={authState.user.name}
              />
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem><Link className="NavBar-profile-link" to={`/profile/${authState.user._id}`}>profile</Link></DropdownItem>
              <DropdownItem divider />
              <DropdownItem><Link className="NavBar-profile-link" onClick={() => authDispatch({ type: 'noAuth' })}>signOut</Link></DropdownItem>
            </DropdownMenu>
          </UncontrolledDropdown>
        );

      default:
        return <p>loading...</p>;
    }
  }
  const responseGoogle = async ({ accessToken }) => {
    if (accessToken) {
      try {
        const user = await Axios.post(`${baseURL}/api/auth/google`, {
          access_token: accessToken
        });
        modalToggler();
        authDispatch({
          type: "loginSuccess",
          payload: { token: user.data.token, user: user.data.user }
        });
      } catch (err) {
        authDispatch({
          type: "loginFaild",
          payload: { err }
        });
      }
    }
  };
  const responseFacebook = async ({ accessToken }) => {
    if (accessToken) {
      try {
        const user = await Axios.post(`${baseURL}/api/auth/facebook`, {
          access_token: accessToken
        });
        modalToggler();
        authDispatch({
          type: "loginSuccess",
          payload: { token: user.data.token, user: user.data.user }
        });
      } catch (err) {
        authDispatch({
          type: "loginFaild",
          payload: { err }
        });
      }
    }
  };

  return (
    <React.Fragment>
      <Navbar light expand="md" className="NavBar">
        <Container>
          <Collapse isOpen={menuToggle} navbar>
            <Nav>
              <NavItem>
                <Form onSubmit={(e) => { e.preventDefault() }} className="d-inline-flex justifiy-content-center align-items-center">
                  <FaSearch />
                  <Input
                    type="search"
                    name="search"
                    placeholder="Search books..."
                    className="NavBar-search"
                    onChange={(e) => { handleSearch(e) }}
                    value={q}

                  />
                </Form>
              </NavItem>
            </Nav>
          </Collapse>
          <NavbarBrand href="/">
            <img className="NavBar-logo" src={logo} alt="book logo" />
          </NavbarBrand>
          <NavbarToggler onClick={menuToggler} />
          <Collapse isOpen={menuToggle} navbar>
            <Nav className="ml-auto" navbar>
              {renderAuth()}
            </Nav>
          </Collapse>
        </Container>
      </Navbar>
      <Modal isOpen={modalToggle} toggle={modalToggler}>
        <ModalHeader toggle={modalToggler}>SignUp/Login</ModalHeader>
        <ModalBody>
          <GoogleLogin
            clientId="296620850484-g3d3tlketasvpenhtstfo4mkkrbvip6u.apps.googleusercontent.com"
            buttonText="Login"
            render={renderProps => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                This is my custom Google button
              </button>
            )}
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          />
          <FacebookLogin
            appId="2069538863349332"
            autoLoad={false}
            fields="name,email,picture"
            render={renderProps => (
              <button onClick={renderProps.onClick}>
                This is my custom FB button
              </button>
            )}
            callback={responseFacebook}
          />
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={modalToggler}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    </React.Fragment>
  );
}

export default withRouter(NavBar);
