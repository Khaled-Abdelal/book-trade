import React, { useContext, useEffect } from "react";
import "./App.css";
import Layout from "./components/Layout/Layout";
import Home from "./components/Home/Home";
import { AuthProvider, AuthDispatchContext } from "./context/auth.context";
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
  }, []);
  return (
    <div className="App">
      <Layout>
        <Home />
      </Layout>
    </div>
  );
}

export default App;
