import React from "react";
import Sidebar from "../../components/owner/Sidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { createContext, useState } from "react";
import { useProtectPage } from "../../hooks/useProtectPage";
import useFetchPagination from "@/hooks/useFetchPagination";

export const pendingBookingContext = createContext();

function DashboardOwner() {
  const navigate = useNavigate();
  const { userData } = useProtectPage();
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  let url = "";
  if (search) {
    if (userData.worker && userData.worker.id) {
      url = `/api/booking/worker/?status=1&search=${search}&page=${page}&worker_id=${userData.worker.id}`;
    }
  } else {
    if (userData.worker && userData.worker.id) {
      url = `/api/booking/worker/?status=1&page=${page}&worker_id=${userData.worker.id}`;
    }
  }
  const {
    data,
    links,
    isLoading,
    message,
    setData,
    setLinks,
    setMessage,
    setIsLoading,
    clearMessage,
  } = useFetchPagination(url, reload, search);

  return (
    <div className="dashboard">
      <pendingBookingContext.Provider
        value={{
          data,
          links,
          isLoading,
          message,
          setData,
          setLinks,
          setMessage,
          setIsLoading,
          clearMessage,
          setReload,
          reload,
          search,
          setSearch,
          page,
          setPage,
        }}
      >
        <Sidebar />
        <Outlet />
      </pendingBookingContext.Provider>
    </div>
  );
}

export default DashboardOwner;
