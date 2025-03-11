import React from "react";
import { useProtectPage } from "../hooks/useProtectPage";
import { Navigate, Outlet } from "react-router-dom";

function ProtectDashboard() {
  const { isAuthenticated, userData } = useProtectPage();
  // console.log(userData)

  if (Object.keys(isAuthenticated).length > 0 && Object.keys(userData).length > 0) {
    if (!isAuthenticated.status || !userData.is_superuser) {
      return <Navigate to="/" replace />;
    }
    return <Outlet context={userData}/>;
  }
}

export default ProtectDashboard;
