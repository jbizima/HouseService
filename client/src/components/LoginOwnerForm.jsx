import Button from "./ui/Button";
import InputField from "./ui/InputField";
import { useState } from "react";
import axios from "axios";
import ButtonLoading from "./ui/ButtonLoading";
import loadingImg from "/images/n-loading.gif";
import { useNavigate } from "react-router-dom";
import FlashMessage from "./ui/FlashMessage";

// api
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/token";
import api from "../utils/api";

export default function LoginOwnerForm() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    username: "",
    password: "",
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
  const submitForm = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const res = await api.post("/api/token/", {
        username: form.username,
        password: form.password,
      });
      localStorage.setItem(ACCESS_TOKEN, res.data.access);
      localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
      navigate("/owner/home");
      window.location.reload();
    } catch (error) {
      if (error.response) {
        if (error.response.status == 401) {
          setMessage({ success: false, message: "Invalid credentials" });
        } else {
          setMessage({
            success: false,
            message: "Something went wrong. Please try again",
          });
        }
      } else if (error.request) {
        setMessage({
          success: false,
          message: "Network Error. Please check your internet connection",
        });
      } else {
        setMessage({
          success: false,
          message: "Something went wrong. Please try again",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = "http://127.0.0.1:8000/accounts/google/login/";
  };

  return (
    <div className="login-form">
      <div className="card-admin">
        <div className="card-header">Sign in Form @Business-owner</div>
        {message && (
          <FlashMessage
            message={message.message}
            isSuccess={message.success}
            clearMessage={clearMessage}
          />
        )}
        <div className="card-body">
          <form className="login_form">
            <div>
              Username:
              <InputField
                type="text"
                name="username"
                id="username"
                label="Username"
                icon="fa-solid fa-user"
                placeholder="username"
                handleChange={handleChange}
              />
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
                  text="Login"
                  className="btn-dark"
                  img={loadingImg}
                />
              ) : (
                <Button
                  text="Login"
                  className="btn-dark"
                  onClick={submitForm}
                />
              )}
            </div>
            <div className="admin-form">
              <span className="admin-text">
                This is a business owner form, if you are having logging in,
                please contact the website owner to grant you access.
              </span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
