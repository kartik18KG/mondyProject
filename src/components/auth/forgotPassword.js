import React, { useState, useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../../contexts/authContext";
import { forgetPassword } from "../crudFunctions/authFunctions";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");

  const { authData, dispatch } = useContext(AuthContext);
  const message = authData.ResetMessage;

  const handleSubmit = (e) => {
    e.preventDefault();
    forgetPassword(email, dispatch);
  };

  return (
    <div className="login-form-container">
      <div className="login-div">
        <div className="logo">
          <img src="https://www.svgrepo.com/show/154629/big-owl.svg" alt="" />
        </div>
        <div className="title">Forgot Password !!</div>

        <form onSubmit={handleSubmit}>
          <div className="fields">
            <div className="username">
              <svg fill="#999" viewBox="0 0 1024 1024">
                <path
                  className="path1"
                  d="M896 307.2h-819.2c-42.347 0-76.8 34.453-76.8 76.8v460.8c0 42.349 34.453 76.8 76.8 76.8h819.2c42.349 0 76.8-34.451 76.8-76.8v-460.8c0-42.347-34.451-76.8-76.8-76.8zM896 358.4c1.514 0 2.99 0.158 4.434 0.411l-385.632 257.090c-14.862 9.907-41.938 9.907-56.802 0l-385.634-257.090c1.443-0.253 2.92-0.411 4.434-0.411h819.2zM896 870.4h-819.2c-14.115 0-25.6-11.485-25.6-25.6v-438.566l378.4 252.267c15.925 10.618 36.363 15.925 56.8 15.925s40.877-5.307 56.802-15.925l378.398-252.267v438.566c0 14.115-11.485 25.6-25.6 25.6z"
                ></path>
              </svg>
              <input
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                type="email"
                className="user-input"
                required
                placeholder="email"
              />
            </div>
          </div>
          <button type="submit" className="signin-button">
            <div className="center">Send Password Reset Email</div>
          </button>
          <div>{message}</div>

          <div className="link">
            or{" "}
            <NavLink className="text-primary" to="/signup">
              Sign up
            </NavLink>{" "}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
