import React from "react";
import HomePageNav from '../components/HomePageNav'
import RegisterForm from "../components/RegisterForm";

function Register() {
  return (
    <div className="app-container">
      <div className="intro">
        <div className="mask--login">
          <HomePageNav />
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}

export default Register;
