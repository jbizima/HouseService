import React, { useContext } from "react";
import ContentHeaderOwner from "@/components/owner/ContentHeaderOwner";
import useUpdateUser from "@/hooks/useUpdateUser";
import UserForm from "@/components/UserForm";
import { useProtectPage } from "@/hooks/useProtectPage";
import { pendingBookingContext } from "@/pages/owner/DashboardOwner";

function UpdateUserO() {
  const { userData } = useContext(pendingBookingContext);
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
      <ContentHeaderOwner />
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

export default UpdateUserO;
