import React, { useReducer } from "react";

const AuthStateContext = React.createContext();
const AuthDispatchContext = React.createContext();

const initialState = {
  loggedIn: null,
  user: {}
};
function authReducer(state, action) {
  switch (action.type) {
    case "loginSuccess":
      localStorage.setItem("auth-token", JSON.stringify(action.payload.token));
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user
      };
    case "foundUser":
      return {
        ...state,
        loggedIn: true,
        user: action.payload.user
      };
    case "noAuth":
      localStorage.removeItem("auth-token");
      console.log("noauth");
      return {
        ...state,
        loggedIn: false,
        user: {}
      };
    default:
      return state;
  }
}
function AuthProvider({ children }) {
  const [state, dispatch] = useReducer(authReducer, initialState);
  return (
    <AuthDispatchContext.Provider value={dispatch}>
      <AuthStateContext.Provider value={state}>
        {children}
      </AuthStateContext.Provider>
    </AuthDispatchContext.Provider>
  );
}
export { AuthStateContext, AuthDispatchContext, AuthProvider };
