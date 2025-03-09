import logoPic from "/images/logo.png";
import React, { useState, useContext } from "react";
import useFetchPagination from "@/hooks/useFetchPagination";
import PaginationLinks from "@/components/ui/PaginationLinks";
import FlashMessage from "@/components/ui/FlashMessage";
import { useNavigate } from "react-router-dom";
import loaderPicture from "/images/loading-3.gif";
import InputField from "@/components/ui/InputField";
import MyBookingsTable from "@/components/MyBookingsTable";
import { userContext } from "@/pages/house-holder/RootHouseHolder";

function MyBookings() {
  const contextData = useContext(userContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);

  let url = "";
  if (search) {
    url = `/api/bookings/client/?client=${
      contextData.userData.id && contextData.userData.id
    }&search=${search}&page=${page}`;
  } else {
    url = `/api/bookings/client/?client=${
      contextData.userData.id && contextData.userData.id
    }&page=${page}`;
  }

  const { data, links, isLoading, message, clearMessage } = useFetchPagination(
    url,
    reload
  );
  // if(data.length > 0){
  //   // contextData.setReload((old) => !old);
  // }
  // const handleNotification = () => {
  //   contextData.setReload((old) => !old);
  // };
  return (
    <div className="house-content">
      <div className="my-bookings">
        <div className="my-bookings-photo">
          <div className="mask--bookings"></div>
        </div>
        <div className="dashboard--content">
          <div className="header--content">
            <span>My Bookings History</span>
          </div>
          <div className="view-category-header">
            <div className="search-btn">
              <InputField
                type="search"
                name="search"
                id="search"
                label="Search"
                icon="fa-solid fa-search"
                placeholder="Search ... "
                handleChange={(e) => setSearch(e.target.value)}
              />
            </div>

            <i
              className="btn-icon fa fa-eye"
              onClick={() => navigate("/house-holder/")}
            ></i>
          </div>
          {message && (
            <FlashMessage
              message={message.message}
              isSuccess={message.success}
              clearMessage={clearMessage}
            />
          )}
          <MyBookingsTable bookings={data} />
          {isLoading && (
            <div className="loader">
              <img src={loaderPicture} width={100} height={100} />
            </div>
          )}

          <PaginationLinks
            count={links.count}
            next={links.next}
            previous={links.previous}
            setPage={setPage}
            page={page}
          />
        </div>
      </div>
    </div>
  );
}

export default MyBookings;
