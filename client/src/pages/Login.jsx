import React, { useState } from "react";
import HomePageNav from "../components/HomePageNav";
import LoginForm from "../components/LoginForm";
import FlashMessage from "../components/ui/FlashMessage";

function Login() {
  const queryParams = new URLSearchParams(window.location.search);
  const [error, setError] = useState(queryParams.get("error"));
  const [auth, setAuth] = useState(queryParams.get("auth"));
  let msg = "";
  if (error) {
    msg = "Error while logging in with Google, please try again!";
  } else {
    msg = "You need to login first to book an appointment!";
  }
  const [message, setMessage] = useState(msg);
  const clearMessage = () => {
    setMessage();
  };

  return (
    <div className="app-container">
      <div className="intro">
        <div className="mask--login">
          <HomePageNav />

          {error && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FlashMessage
                message={message}
                isSuccess={false}
                clearMessage={clearMessage}
              />
            </div>
          )}
          {auth && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <FlashMessage
                message={message}
                isSuccess={false}
                clearMessage={clearMessage}
              />
            </div>
          )}

          <LoginForm />
        </div>
      </div>
    </div>
  );
}

export default Login;
