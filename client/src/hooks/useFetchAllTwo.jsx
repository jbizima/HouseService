import { useState, useEffect } from "react";
import axios from "axios";
import { axiosHeader } from "../utils/axiosHeader";
import { useNavigate } from "react-router-dom";

export default function useFetchAllTwo(url) {
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const clearMessage = () => {
    setMessage();
  };
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    setIsLoading(true);

    axios
      .get(axiosHeader.url + url, {
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        if (err.message !== "canceled") {
          setMessage({
            success: false,
            message: err.message,
          });
        }
        if (err.status == 401) {
          setMessage({
            success: false,
            message: "You need to login first!, Token Expired!",
          });
          setTimeout(() => {
            navigate("/login");
          }, 6000);
        } else if (err.status == 400) {
          setMessage({
            success: false,
            message: err.response.data,
          });
        } else if (err.code == "ERR_NETWORK") {
          setMessage({
            success: false,
            message: "Please check your internet connection",
          });
        } else {
          setMessage({
            success: false,
            message: err.message,
          });
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => {
      cancelToken.cancel();
    };
  }, [url]);

  return {
    data,
    isLoading,
    message,
    setData,
    setIsLoading,
    setMessage,
    clearMessage,
  };
}
