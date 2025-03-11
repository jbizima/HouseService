import React from "react";
import Sidebar from "../components/Sidebar";
import { Outlet, useNavigate, useOutletContext } from "react-router-dom";
import { createContext, useState } from "react";
import { useProtectPage } from "../hooks/useProtectPage";
import useFetchPagination from "@/hooks/useFetchPagination";

export const pendingBookingContext = createContext();

function Dashboard() {
  const userData = useOutletContext();
  const navigate = useNavigate();
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);
  let url = "";
  if (search) {
    url = `/api/booking/?status=1&search=${search}&page=${page}`;
  } else {
    url = `/api/booking/?status=1&page=${page}`;
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
          userData,
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

export default Dashboard;
