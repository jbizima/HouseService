import React,{useContext} from "react";
import ContentHeader from "../components/ContentHeader";
import useUpdateUser from "@/hooks/useUpdateUser";
import UserForm from "@/components/UserForm";
import { useProtectPage } from "@/hooks/useProtectPage";
import { pendingBookingContext } from "@/pages/Dashboard";

function UpdateUser() {
  const {userData} = useContext(pendingBookingContext);
  // const { userData } = useProtectPage();
  const {
    message,
    isLoading,
    form,
    handleChange,
    validateSubmitForm,
    clearMessage,
    fieldError,
  } = useUpdateUser(userData);

  return (
    <div className="dashboard--content category">
      <ContentHeader />
      <div className="hr"></div>
      <div className="header--content">
        <span>Update user Info</span>
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
  );
}

export default UpdateUser;
