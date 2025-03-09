import HomePageNav from "@/components/HomePageNav";
import React, { createContext, useState } from "react";
import { Outlet } from "react-router-dom";
import { useProtectPage } from "@/hooks/useProtectPage";
import Navbar from "@/components/house-holder/Navbar";
import useFetchPagination from "@/hooks/useFetchPagination";
export const userContext = createContext();

function RootHouseHolder() {
  const { userData, logout } = useProtectPage();
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);

  let url = "";
  if (search) {
    url = `/api/bookings/client/?client=${
      userData.id && userData.id
    }&search=${search}&page=${page}&update=False`;
  } else {
    url = `/api/bookings/client/?client=${
      userData.id && userData.id
    }&page=${page}&update=False`;
  }

  const { data, links, isLoading, message, clearMessage } = useFetchPagination(
    url,
    reload
  );
  const unReadList = data.filter((item,_)=>item.read == "2")
  const unreadNbr = unReadList.length
  return (
    <div className="app-container householder">
      <userContext.Provider value={{ userData, logout, setReload, unreadNbr }}>
        <Navbar />
        <Outlet />
      </userContext.Provider>
    </div>
  );
}

export default RootHouseHolder;
