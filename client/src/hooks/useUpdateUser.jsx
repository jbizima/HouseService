import { useState } from "react";
import axios from "axios";
import { axiosHeader } from "../utils/axiosHeader";

export default function useUpdateUser(user) {
  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };
  const [isLoading, setIsLoading] = useState(false);

  const [form, setForm] = useState(
    user
      ? {
          firstName: user.first_name,
          lastName: user.last_name,
          username: user.username,
          password: "",
          confirmPassword: "",
        }
      : {
          firstName: "",
          lastName: "",
          username: "",
          password: "",
          confirmPassword: "",
        }
  );
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [name]: value };
    });
  };

  // handle form input error
  const [fieldError, setFieldError] = useState({});
  const validateSubmitForm = async (e) => {
    e.preventDefault();
    let errors = {};
    if (form.password !== form.confirmPassword) {
      errors = { confirmPassword: "Passwords did not match" };
      setFieldError(errors);
    }

    console.log(Object.keys(errors).length);
    if (Object.keys(errors).length == 0) {
      //   form.firstName = form.firstName ? form.firstName : user.first_name;
      //   form.lastName = form.lastName ? form.lastName : user.last_name;
      //   form.username = form.username ? form.username : user.username;
      submitForm();
    }
  };

  const submitForm = (e) => {
    setIsLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      axiosHeader.jwt ? axiosHeader.jwt : axiosHeader.google
    }`;
    axios
      .patch(axiosHeader.url + `/api/user/update/${user.id}`, {
        first_name: form.firstName,
        last_name: form.lastName,
        username: form.username,
        
      })
      .then((res) => {
        setMessage({
          success: true,
          message: "User updated successfuly",
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
    fieldError,
    form,
    handleChange,
    validateSubmitForm,
    clearMessage,
    message,
  };
}
