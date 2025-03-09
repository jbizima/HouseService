import { useState, useContext } from "react";
import axios from "axios";
import { categoryContext } from "../pages/ViewCategory";
import { axiosHeader } from "../utils/axiosHeader";
import { useNavigate } from "react-router-dom";
export default function useUpdatePhoto(closeModal, categoryIndex, categoryId) {
  const navigate = useNavigate();
  const update = useContext(categoryContext);
  //   handle files
  const [file, setFiles] = useState();
  const handleFile = (e) => {
    setFiles(e.target.files[0]);
  };

  // handle form input error
  const [fieldError, setFieldError] = useState({});
  const validateSubmitForm = async (submit_type, photoId) => {
    const validatedFields = {};
    if (!file) {
      validatedFields["file" + photoId] = "you didn't upload any file";
      setFieldError(validatedFields);
    }
    if (Object.keys(validatedFields).length == 0) {
      if (submit_type == "add_photo") {
        submitAddPhoto();
      } else {
        submitForm(photoId);
      }
    }
  };

  const submitForm = (photoId) => {
    // close the modal when button clicked
    closeModal(categoryIndex, "photos");
    // display loading icon
    update.setIsLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      axiosHeader.jwt ? axiosHeader.jwt : axiosHeader.google
    }`;
    const data = new FormData();
    data.append("image", file, file.name);
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    axios
      .patch(
        axiosHeader.url + `/api/category/image/update/${photoId}`,
        data,
        config
      )
      .then((res) => {
        update.setMessage({
          success: true,
          message: "Photo updated successfuly",
        });
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
  const submitAddPhoto = () => {
    // close the modal when button clicked
    closeModal(categoryIndex, "photos");
    // display loading icon
    update.setIsLoading(true);
    axios.defaults.headers.common["Authorization"] = `Bearer ${
      axiosHeader.jwt ? axiosHeader.jwt : axiosHeader.google
    }`;
    const data = new FormData();
    data.append("image", file, file.name);
    data.append("category", categoryId);
    const config = {
      headers: { "Content-Type": "multipart/form-data" },
    };

    axios
      .post(axiosHeader.url + `/api/category/image/add/`, data, config)
      .then((res) => {
        update.setMessage({
          success: true,
          message: "Photo added successfuly",
        });
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
    file,
    handleFile,
    validateSubmitForm,
  };
}
