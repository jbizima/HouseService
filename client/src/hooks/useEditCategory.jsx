import { useState, useContext } from "react";
import axios from "axios";
import fieldValidation from "../utils/fieldValidation.mjs";
import { categoryContext } from "../pages/ViewCategory";
import { axiosHeader } from "../utils/axiosHeader";
import { useNavigate } from "react-router-dom";
export default function useEditCategory(category, closeModal, categoryIndex) {
  const update = useContext(categoryContext);
  const navigate = useNavigate()
  const [form, setForm] = useState(
    category
      ? {
          name: category.name,
          description: category.description,
        }
      : {
          name: "",
          description: "",
        }
  );

  // handle form input error
  const [fieldError, setFieldError] = useState({});
  const validateSubmitForm = async (e) => {
    e.preventDefault();
    const inputFields = {
      name: form.name,
      description: form.description,
    };
    const validatedFields = fieldValidation(inputFields);
    setFieldError(validatedFields);

    if (Object.keys(validatedFields).length == 0) {
      submitForm();
    }
  };

  // handle input value when changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [name]: value };
    });
  };

  const submitForm = (e) => {
    // close the modal when button clicked
    closeModal(categoryIndex, "edit");

    // display loading icon
    update.setIsLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      axiosHeader.jwt ? axiosHeader.jwt : axiosHeader.google
    }`;

    axios
      .patch(axiosHeader.url + `/api/categories/update/${category.id}`, {
        name: form.name,
        description: form.description,
      })
      .then((res) => {
        update.setMessage({
          success: true,
          message: "Category updated successfuly",
        });
        //update categories' List
        update.setData((oldData) => {
          const newList = oldData.map((item) => {
            if (item.id === category.id) {
              item.name = form.name;
              item.description = form.description;
              return item;
            } else {
              return item;
            }
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
    fieldError,
    form,
    handleChange,
    validateSubmitForm,
  };
}
