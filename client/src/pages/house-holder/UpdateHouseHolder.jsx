import React, { useState, useContext } from "react";
import { userContext } from "../pages/house-holder/RootHouseHolder";
import useUpdateUser from "../hooks/useUpdateUser";
import UserForm from "../components/UserForm";

function UpdateHouseHolder() {
  const contextData = useContext(userContext);
  const {
    message,
    isLoading,
    form,
    handleChange,
    validateSubmitForm,
    clearMessage,
    fieldError,
  } = useUpdateUser(contextData.userData && contextData.userData);
  return (
    <div className="house-content">
      <div className="my-bookings">
        <div className="my-bookings-photo">
          <div className="mask--bookings"></div>
        </div>
        <div className="dashboard--content">
          <div className="header--content">
            <span>Update data</span>
          </div>

          <UserForm
            message={message}
            isLoading={isLoading}
            form={form}
            handleChange={handleChange}
            submitForm={validateSubmitForm}
            clearMessage={clearMessage}
            fieldError={fieldError}
          />
        </div>
      </div>
    </div>
  );
}

export default UpdateHouseHolder;
