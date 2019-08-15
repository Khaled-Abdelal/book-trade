import React, { useContext, useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Browse from "./components/Browse/Browse";
import AddBook from "./components/AddBook/AddBook";
import { AuthDispatchContext } from "./context/auth.context";
import Axios from "axios";

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
        const user = await Axios.get(`${baseURL}/api/users/me`, {
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
      <Layout>
       <Browse />
      </Layout>
    </div>
  );
}

export default App;
