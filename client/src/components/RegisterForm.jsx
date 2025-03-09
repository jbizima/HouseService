import Button from "./ui/Button";
import InputField from "./ui/InputField";
import { useState } from "react";
import axios from "axios";
import ButtonLoading from "./ui/ButtonLoading";
import loadingImg from "/images/n-loading.gif";
import { useNavigate } from "react-router-dom";
import FlashMessage from "./ui/FlashMessage";
import googlePicture from "/images/google.png";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/token";
import api from "../utils/api";
import fieldValidation from "../utils/fieldValidation.mjs";
import { axiosHeader } from "../utils/axiosHeader";

export default function RegisterForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
    email: "",
    last_name: "",
    first_name: "",
  });

  const [message, setMessage] = useState();
  const clearMessage = () => {
    setMessage();
  };

  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    let { name, value } = e.target;
    setForm((oldForm) => {
      return { ...oldForm, [name]: value };
    });
  };
  // handle form input error
  const [fieldError, setFieldError] = useState({});
  const validateSubmitForm = async (e) => {
    e.preventDefault();
    const inputFields = {
      username: form.username,
      password: form.password,
      email: form.email,
      last_name: form.last_name,
      first_name: form.first_name,
    };
    const validatedFields = fieldValidation(inputFields);
    setFieldError(validatedFields);
    if (Object.keys(validatedFields).length == 0) {
      submitForm();
    }
  };
  const submitForm = async () => {
    setIsLoading(true);
    axios
      .post(axiosHeader.url + "/api/user/register/", {
        username: form.username,
        password: form.password,
        email: form.email,
        last_name: form.last_name,
        first_name: form.first_name,
      })
      .then((res) => {
        setMessage({
          success: true,
          message: "Registered successfuly, now you can login",
        });
        setTimeout(() => {
          navigate("/login");
        }, 6000);
        setForm({
          username: "",
          password: "",
          email: "",
          last_name: "",
          first_name: "",
        });
      })
      .catch((err) => {
        if (err.status == 400) {
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

  const handleGoogleLogin = () => {
    window.location.href = "http://127.0.0.1:8000/accounts/google/login/";
  };
  return (
    <div className="login-form">
      <div className="card-a" style={{ width: "600px" }}>
        <div className="card-header">Sign up</div>
        {message && (
          <FlashMessage
            message={message.message}
            isSuccess={message.success}
            clearMessage={clearMessage}
          />
        )}
        <div className="card-body">
          <form className="login_form" onSubmit={validateSubmitForm}>
            <div className="form-row">
              <div className="form-col">
                {fieldError.first_name && (
                  <i className="error-text">{fieldError.first_name}</i>
                )}
                <InputField
                  // type="text"
                  name="first_name"
                  type="text"
                  id="first_name"
                  errorfield={fieldError.first_name && "error-field--register"}
                  label="first_name"
                  icon="fa-solid fa-user"
                  placeholder="first_name"
                  handleChange={handleChange}
                  value={form.first_name}
                />
              </div>
              <div className="form-col">
                {fieldError.last_name && (
                  <i className="error-text">{fieldError.last_name}</i>
                )}
                <InputField
                  // type="text"
                  name="last_name"
                  type="text"
                  id="last_name"
                  errorfield={fieldError.last_name && "error-field--register"}
                  label="last_name"
                  icon="fa-solid fa-user"
                  placeholder="last_name"
                  handleChange={handleChange}
                  value={form.last_name}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                {fieldError.username && (
                  <i className="error-text">{fieldError.username}</i>
                )}
                <InputField
                  // type="text"
                  name="username"
                  type="text"
                  id="username"
                  errorfield={fieldError.username && "error-field--register"}
                  label="username"
                  icon="fa-solid fa-user"
                  placeholder="username "
                  handleChange={handleChange}
                  value={form.username}
                />
              </div>
              <div className="form-col">
                {fieldError.email && (
                  <i className="error-text">{fieldError.email}</i>
                )}
                <InputField
                  // type="text"
                  name="email"
                  type="email"
                  id="email"
                  errorfield={fieldError.email && "error-field--register"}
                  label="Email"
                  icon="fa-solid fa-envelope"
                  placeholder="Email"
                  handleChange={handleChange}
                  value={form.email}
                />
              </div>
            </div>

            <div>
              Password:
              <InputField
                type="password"
                name="password"
                id="password"
                label="Password"
                icon="fa-solid fa-lock"
                placeholder="*************"
                handleChange={handleChange}
              />
            </div>
            <div>
              {isLoading ? (
                <ButtonLoading
                  text="Register"
                  className="btn-dark"
                  img={loadingImg}
                />
              ) : (
                <Button text="Register" className="btn-dark" />
              )}
            </div>
            <div>
              <button
                type="button"
                className="btn-google"
                onClick={handleGoogleLogin}
              >
                <img
                  src={googlePicture}
                  alt="Google icon"
                  className="google-icon"
                  height={100}
                  width={100}
                />{" "}
                Register with google
              </button>
            </div>
          </form>
        </div>
        <div className="card-footer-login">
          Already have an account?{" "}
          <i
            style={{
              color: "#0e0ed1",
              fontWeight: "bolder",
              fontStyle: "normal",
              cursor: "pointer",
            }}
            onClick={() => navigate("/login")}
          >
            Login
          </i>
        </div>
      </div>
    </div>
  );
}
