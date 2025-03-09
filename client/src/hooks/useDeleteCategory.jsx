import { useState, useContext } from "react";
import axios from "axios";
import { categoryContext } from "../pages/ViewCategory";
import { axiosHeader } from "../utils/axiosHeader";
import { useNavigate } from "react-router-dom";
export default function useDeleteCategory(category, closeModal, categoryIndex) {
  const update = useContext(categoryContext);
  const navigate = useNavigate()
  const submitForm = (e) => {
    // close the modal when button clicked
    e.preventDefault();
    closeModal(categoryIndex, "delete");

    // display loading icon
    update.setIsLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      axiosHeader.jwt ? axiosHeader.jwt : axiosHeader.google
    }`;

    axios
      .delete(axiosHeader.url + `/api/categories/delete/${category.id}`)
      .then((res) => {
        update.setMessage({
          success: false,
          message: "Category deleted successfuly",
        });

        // update categories' List
        update.setData((oldData) => {
          const newList = oldData.filter((item, i) => {
            return item.id !== category.id;
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
