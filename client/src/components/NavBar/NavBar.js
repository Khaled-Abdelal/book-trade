import React, { useContext } from "react";
import { GoogleLogin } from "react-google-login";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import useToggle from "../../hooks/useToggle";
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
  Button
} from "reactstrap";
import {
  AuthStateContext,
  AuthDispatchContext
} from "../../context/auth.context";
import Axios from "axios";
const baseURL = process.env.REACT_APP_BASE_URL;

function NavBar() {
  const [menuToggle, menuToggler] = useToggle(false);
  const [modalToggle, modalToggler] = useToggle(false);

  const authState = useContext(AuthStateContext);
  const authDispatch = useContext(AuthDispatchContext);
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
            <DropdownToggle nav caret>
              Options
            </DropdownToggle>
            <DropdownMenu right>
              <DropdownItem>Option 1</DropdownItem>
              <DropdownItem divider />
              <DropdownItem>Reset</DropdownItem>
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
    <div>
      <Navbar color="light" light expand="md">
        <Collapse isOpen={menuToggle} navbar>
          <Nav>
            <NavItem>
              <Form>
                <Input
                  type="search"
                  name="search"
                  placeholder="Search books..."
                />
              </Form>
            </NavItem>
          </Nav>
        </Collapse>
        <NavbarBrand href="/">Logo</NavbarBrand>
        <NavbarToggler onClick={menuToggler} />
        <Collapse isOpen={menuToggle} navbar>
          <Nav className="ml-auto" navbar>
            {renderAuth()}
          </Nav>
        </Collapse>
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
    </div>
  );
}

export default NavBar;
