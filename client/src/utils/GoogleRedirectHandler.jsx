import React from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { GOOGLE_ACCESS_TOKEN } from "./token";

function GoogleRedirectHandler() {
  const navigate = useNavigate();
  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const accessToken = queryParams.get("access_token");

    if (accessToken) {
      localStorage.setItem(GOOGLE_ACCESS_TOKEN, accessToken);

      // verify token from backend
      axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`;
      axios
        .get("http://127.0.0.1:8000/api/auth/user/")
        .then((response) => {
          navigate("/house-holder");
          window.location.reload();
        })
        .catch((error) => {
          navigate("/login");
        });
    } else {
      navigate("/login/?error=true");
      
    }
  }, [navigate]);

  return <div className="callback">Logging in .....</div>;
}

export default GoogleRedirectHandler;
