import { useState, useEffect } from "react";
import axios from "axios";
import { axiosHeader } from "../utils/axiosHeader";
import { useNavigate } from "react-router-dom";

export default function useFetchAutoComplete(url, search, refreshData) {
  const [data, setData] = useState([]);
  const navigate = useNavigate()
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
      .get(
        axiosHeader.url + url,
        { search: search },
        {
          cancelToken: cancelToken.token,
        }
      )
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
        setTimeout(() => {
          navigate("/login");
        }, 6000);
      })
      .finally(() => {
        setIsLoading(false);
      });
    return () => {
      cancelToken.cancel();
    };
  }, [search, refreshData]);

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
