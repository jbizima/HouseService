import { useState, useEffect } from "react";
import axios from "axios";
import { axiosHeader } from "../utils/axiosHeader";
import { useNavigate } from "react-router-dom";

export default function useFetchPagination(url, reload, search) {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [links, setLinks] = useState({ count: 0, next: "", previous: "" });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const clearMessage = () => {
    setMessage();
  };
  useEffect(() => {
    const cancelToken = axios.CancelToken.source();
    setIsLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      axiosHeader.jwt ? axiosHeader.jwt : axiosHeader.google
    }`;
    axios
      .get(axiosHeader.url + url, {
        cancelToken: cancelToken.token,
      })
      .then((res) => {
        setData(res.data.results);
        let next_page = null;
        let prev_page = null;
        if (res.data.next) {
          let x = res.data.next.indexOf("=");
          next_page = res.data.next.slice(x + 1);
        }
        if (res.data.previous) {
          let x = res.data.previous.indexOf("=");
          prev_page = res.data.previous.slice(x + 1);
        }
        setLinks({
          count: res.data.count,
          next: next_page,
          previous: prev_page,
        });
      })
      .catch((err) => {
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
          if (err.message !== "canceled") {
            setMessage({
              success: false,
              message: err.message,
            });
          }
        }
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => {
      cancelToken.cancel();
    };
  }, [url, reload, search]);

  return {
    data,
    links,
    isLoading,
    message,
    setLinks,
    setData,
    setIsLoading,
    setMessage,
    clearMessage,
  };
}
