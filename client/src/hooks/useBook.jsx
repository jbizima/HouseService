import { useState, useContext } from "react";
import axios from "axios";
import { axiosHeader } from "../utils/axiosHeader";
import { useNavigate } from "react-router-dom";
export default function useBook(service_id, client_id,worker_id, date) {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const clearMessage = () => {
    setMessage();
  };
  const [form, setForm] = useState({
    service: service_id,
    worker: worker_id,
    client: client_id,
    date: date,
    time: null,
  });
  const submitForm = (e) => {
    setIsLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      axiosHeader.jwt ? axiosHeader.jwt : axiosHeader.google
    }`;
   console.log(form)
    axios
      .post(axiosHeader.url + `/api/bookings/create/`, {
        service: form.service,
        worker: form.worker,
        client: form.client,
        date_booking: form.date,
        time: form.time,
      })
      .then((res) => {
        setMessage({
          success: true,
          message: "Booking appointment submitted successfuly",
        });
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
  };
  return {
    submitForm,
    isLoading,
    setIsLoading,
    message,
    setMessage,
    clearMessage,
    setForm,
  };
}
