import React from "react";
import ContentHeaderOwner from "@/components/owner/ContentHeaderOwner";
import InputField from "@/components/ui/InputField";
import { useState, createContext } from "react";
import { useNavigate } from "react-router-dom";
import BookTable from "@/components/owner/BookTable";
import FlashMessage from "@/components/ui/FlashMessage";
import useFetchPagination from "@/hooks/useFetchPagination";
import PaginationLinks from "@/components/ui/PaginationLinks";
import loaderPicture from "/images/loading-3.gif";
import { useProtectPage } from "@/hooks/useProtectPage";

function ApprovalBookingsO() {
  const navigate = useNavigate();
  const { userData } = useProtectPage();
  const [search, setSearch] = useState(null);
  const [page, setPage] = useState(1);
  const [reload, setReload] = useState(false);

  let url = "";
  if (search) {
    if (userData.worker && userData.worker.id) {
      url = `/api/booking/worker/?status=2&search=${search}&page=${page}&worker_id=${userData.worker.id}`;
    }
  } else {
    if (userData.worker && userData.worker.id) {
      url = `/api/booking/worker/?status=2&page=${page}&worker_id=${userData.worker.id}`;
    }
  }

  const { data, links, isLoading, message, clearMessage } = useFetchPagination(
    url,
    reload
  );

  return (
    <div className="dashboard--content category">
      <ContentHeaderOwner />
      <div className="hr"></div>
      <div className="header--content">
        <span>List Approval Bookings {userData.worker && userData.worker.id}</span>
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
          onClick={() => navigate("/owner/approve-bookings")}
        ></i>
      </div>
      {message && (
        <FlashMessage
          message={message.message}
          isSuccess={message.success}
          clearMessage={clearMessage}
        />
      )}
      <BookTable bookings={data ? data: []} page="approve" />
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
  );
}

export default ApprovalBookingsO;
