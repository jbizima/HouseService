import { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import api from "../utils/api";
import { axiosHeader } from "../utils/axiosHeader";
import { Navigate, useNavigate } from "react-router-dom";

import {
  ACCESS_TOKEN,
  REFRESH_TOKEN,
  GOOGLE_ACCESS_TOKEN,
} from "../utils/token";
import axios from "axios";

export const useProtectPage = () => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState({ status: false });
  const [userData, setUserData] = useState({});

  // ##################### checking token to return authentication status #############
  useEffect(() => {
    const auth = async () => {
      const token = localStorage.getItem(ACCESS_TOKEN);
      const googleAccessToken = localStorage.getItem(GOOGLE_ACCESS_TOKEN);

      if (token) {
        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;
        if (tokenExpiration < now) {
          await refreshToken();
        } else {
          setIsAuthenticated({ status: true });
          getUserInfo();
        }
      } else if (googleAccessToken) {
        const isGoogleTokenValid = await validateGoogleToken(googleAccessToken);
        if (isGoogleTokenValid) {
          setIsAuthenticated({ status: true });
          getUserInfo();
        } else {
          setIsAuthenticated({ status: false });
        }
      } else {
        setIsAuthenticated({ status: false });
        navigate("/");
      }
    };
    auth().catch(() => setIsAuthenticated({ status: false }));
  }, []);
  // ###################### End token checking ############################

  // ##### refresh token form jwt #######
  const refreshToken = async () => {
    const refreshToken = localStorage.getItem(REFRESH_TOKEN);
    try {
      const res = await api.post("/api/token/refresh/", {
        refresh: refreshToken,
      });
      if (res.status == 200) {
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        setIsAuthenticated({ status: true });
        getUserInfo();
      } else {
        setIsAuthenticated({ status: false });
      }
    } catch (error) {
      setIsAuthenticated({ status: false });
    }
  };

  // ################ check google token validity
  const validateGoogleToken = async (googleAccessToken) => {
    try {
      const res = await api.post(
        "/api/google/validate_token/",
        {
          access_token: googleAccessToken,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      return res.data.valid;
    } catch (error) {
      return false;
    }
  };
  // ########## authenticated user info ######################
  const getUserInfo = () => {
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      axiosHeader.jwt ? axiosHeader.jwt : axiosHeader.google
    }`;
    axios
      .get(axiosHeader.url + "/api/auth/user/")
      .then((res) => {
        setUserData(res.data);
      })
      .catch((err) => {
        if (err.status == 401) {
          navigate("/");
        }
      });
  };
  const logout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    localStorage.removeItem(GOOGLE_ACCESS_TOKEN);
    setIsAuthenticated({ status: false });

    navigate("/");
    window.location.reload();
  };
  return { isAuthenticated, logout, userData };
};
