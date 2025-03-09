import { useState, useContext } from "react";
import axios from "axios";
import fieldValidation from "../utils/fieldValidation.mjs";
import { workerContext } from "../pages/ViewWorker";
import { axiosHeader } from "../utils/axiosHeader";
import { useNavigate } from "react-router-dom";
export default function useEditWorker(worker, closeModal, workerIndex) {
  const update = useContext(workerContext);
  const navigate = useNavigate()
  const [form, setForm] = useState(
    worker
      ? {
          name: worker.name,
          service: worker.service,
          phone: worker.phone,
          email: worker.email,
          address: worker.address,
          price: worker.price,
        }
      : {
          name: "",
          service: "",
          phone: "",
          email: "",
          address: "",
          price: 0,
        }
  );

  // handle form input error
  const [fieldError, setFieldError] = useState({});
  const validateSubmitForm = async (e) => {
    e.preventDefault();
    const inputFields = {
      name: form.name,
      service: form.service,
      phone: form.phone,
      email: form.email,
      address: form.address,
      price: form.price,
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
    closeModal(workerIndex, "edit");

    // display loading icon
    update.setIsLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      axiosHeader.jwt ? axiosHeader.jwt : axiosHeader.google
    }`;

    axios
      .patch(axiosHeader.url + `/api/workers/update/${worker.id}`, {
        name: form.name,
        service: form.service,
        phone: form.phone,
        email: form.email,
        address: form.address,
        price: form.price,
      })
      .then((res) => {
        update.setMessage({
          success: true,
          message: "worker updated successfuly",
        });
        //update workers' List
        update.setReload((old) => !old);
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
