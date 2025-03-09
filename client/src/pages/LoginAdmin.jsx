import React, { useState } from "react";
import HomePageNav from "../components/HomePageNav";
import LoginAdminForm from "../components/LoginAdminForm";
import FlashMessage from "../components/ui/FlashMessage";

function LoginAdmin() {
  const queryParams = new URLSearchParams(window.location.search);
  const [error, setError] = useState(queryParams.get("error"));
  const [message, setMessage] = useState(
    "Error while logging in with Google, please try again!"
  );
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

          <LoginAdminForm />
        </div>
      </div>
    </div>
  );
}

export default LoginAdmin;
