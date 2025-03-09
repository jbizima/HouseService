import { useState, useContext } from "react";
import axios from "axios";
import { pendingBookingContext } from "@/pages/owner/DashboardOwner";
import { axiosHeader } from "../utils/axiosHeader";
import { useNavigate } from "react-router-dom";
export default function useApproveBooking(booking, closeModal, bookingIndex) {
  const update = useContext(pendingBookingContext);
  const navigate = useNavigate();
  const submitForm = (status) => {
    // close the modal when button clicked

    closeModal(bookingIndex);

    // display loading icon
    update.setIsLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      axiosHeader.jwt ? axiosHeader.jwt : axiosHeader.google
    }`;

    axios
      .patch(axiosHeader.url + `/api/bookings/update/${booking.id}`, {
        status: status,
        read: "2",
      })
      .then((res) => {
        if (status == "3") {
          update.setMessage({
            success: false,
            message: "Appointment denied successfuly",
          });
        } else {
          update.setMessage({
            success: true,
            message: "Appointment approved successfuly",
          });
        }

        // update bookings' List
        // update.setReload((old) => !old);
        update.setData((oldData) => {
          const newList = oldData.filter((item, i) => {
            return item.id !== booking.id;
          });
          return newList;
        });
      })
      .catch((err) => {
        if (err.message !== "canceled") {
          update.setMessage({
            success: false,
            message: err.message,
          });
        }
        if (err.status == 401) {
          update.setMessage({
            success: false,
            message: "You need to login first!, Token Expired!",
          });
          setTimeout(() => {
            navigate("/login");
          }, 6000);
        } else if (err.status == 400) {
          update.setMessage({
            success: false,
            message: err.response.data,
          });
        } else if (err.code == "ERR_NETWORK") {
          update.setMessage({
            success: false,
            message: "Please check your internet connection",
          });
        } else {
          update.setMessage({
            success: false,
            message: err.message,
          });
        }
      })
      .finally(() => {
        update.setIsLoading(false);
      });
  };
  return {
    submitForm,
  };
}
