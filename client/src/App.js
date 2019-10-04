import React, { useContext, useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Browse from "./components/Browse/Browse";
import AddBook from "./components/AddBook/AddBook";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { AuthDispatchContext } from "./context/auth.context";
import Axios from "axios";
import Profile from "./components/Profile/Profile";
import SearchBooks from "./components/SearchBooks/SearchBooks";

const baseURL = process.env.REACT_APP_BASE_URL;

function App() {
  const authDispatch = useContext(AuthDispatchContext);
  useEffect(() => {
    const token = JSON.parse(localStorage.getItem("auth-token"));
    if (!token) {
      return authDispatch({ type: "noAuth" });
    }
    async function getAuthUser() {
      try {
        const user = await Axios.get(`${baseURL}/api/users/auth/me`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        authDispatch({ type: "foundUser", payload: { user: user.data } });
      } catch (err) {
        authDispatch({ type: "noAuth" });
      }
    }
    getAuthUser();
  }, [authDispatch]);
  return (
    <div className="App">
      <Router>
        <Layout>
          <Switch>
            <Route exact path="/profile/:id" component={Profile} />
            <Route exact path="/" component={Browse} />
            <Route exact path="/addbook" component={AddBook} />
            <Route exact path="/search" component={SearchBooks} />
          </Switch>
        </Layout>
      </Router>
    </div>
  );
}

export default App