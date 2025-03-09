import React, { useState } from "react";
import ContentHeader from "../components/ContentHeader";
import WorkerForm from "../components/WorkerForm";
import axios from "axios";
import fieldValidation from "../utils/fieldValidation.mjs";
import { axiosHeader } from "../utils/axiosHeader";

function AddWorker() {
  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };
  const [isLoading, setIsLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    service: "",
    phone: "",
    email: "",
    address: "",
    price: 0,
    username: "",
  });
  //   handle files
  const [file, setFiles] = useState({});
  const handleFile = (e) => {
    setFiles(e.target.files);
  };
  const removeFile = (index) => {
    setFiles((oldFiles) => {
      return [...oldFiles].filter((_, i) => i != index);
    });
  };

  // handle form input error
  const [fieldError, setFieldError] = useState({});
  const validateSubmitForm = async (e) => {
    e.preventDefault();

    const inputFields = {
      name: form.name,
      file: file,
      service: form.service,
      phone: form.phone,
      email: form.email,
      address: form.address,
      price: form.price,
      username: form.username,
    };
    const validatedFields = fieldValidation(inputFields);
    setFieldError(validatedFields);
    if (Object.keys(validatedFields).length == 0) {
      submitForm();
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [name]: value };
    });
  };
  const submitForm = () => {
    setIsLoading(true);

    axios.defaults.headers.common["Authorization"] = `Bearer ${
      axiosHeader.jwt ? axiosHeader.jwt : axiosHeader.google
    }`;
    const data = new FormData();
    data.append("name", form.name);
    data.append("service", form.service);
    data.append("email", form.email);
    data.append("phone", form.phone);
    data.append("address", form.address);
    data.append("price", form.price);
    data.append("user", 1);
    data.append("category", 1);
    data.append("username", form.username);
    data.append("image", file[0], file[0].name);

    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };
    axios
      .post(axiosHeader.url + "/api/workers/create/", data, config)
      .then((res) => {

        setMessage({
          success: true,
          message: "Service inserted successfuly",
        });
        setForm({
          name: "",
          service: "",
          phone: "",
          email: "",
          address: "",
          price: 0,
        });
        setFiles({});
      })
      .catch((err) => {
        if (err.status == 401) {
          setMessage({
            success: false,
            message: "You need to login first!, Token Expired!",
          });
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
  return (
    <div className="dashboard--content category">
      <ContentHeader />
      <div className="hr"></div>
      <div className="header--content">
        <span>Add Worker</span>
      </div>
      <WorkerForm
        message={message}
        isLoading={isLoading}
        form={form}
        handleChange={handleChange}
        submitForm={validateSubmitForm}
        clearMessage={clearMessage}
        fieldError={fieldError}
        handleFile={handleFile}
        file={file}
        removeFile={removeFile}
      />
    </div>
  );
}

export default AddWorker;
