import React from "react";
import ContentHeader from "../components/ContentHeader";
import InputField from "../components/ui/InputField";
import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import BookingTable from "../components/BookingTable";
import FlashMessage from "../components/ui/FlashMessage";
import PaginationLinks from "../components/ui/PaginationLinks";
import loaderPicture from "/images/loading-3.gif";
import { pendingBookingContext } from "@/pages/Dashboard";
import ApproveBookingModal from "@/components/owner/ApproveBookingModal";

function PendingBookings() {
  const booking = useContext(pendingBookingContext);
  const navigate = useNavigate();

  // handle modals
  const [animation, setAnimation] = useState("animated fadeIn");
  const [clickedRow, setClickedRow] = useState(null);

  const [openApproveModal, setOpenApproveModal] = useState(false);

  const [status, setStatus] = useState("");

  const handleModal = (index, status = "") => {
    // get the targeted item id
    setClickedRow(index);
    setStatus(status);

    setAnimation(openApproveModal ? "animated fadeOut" : "animated fadeIn");
    setTimeout(() => {
      setOpenApproveModal((oldModalState) => !oldModalState);
    }, 1000);
  };

  return (
    <div className="dashboard--content category">
      <ContentHeader />
      <div className="hr"></div>
      <div className="header--content">
        <span>List Pending Bookings</span>
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
            handleChange={(e) => booking.setSearch(e.target.value)}
          />
        </div>

        <i
          className="btn-icon fa fa-eye"
          onClick={() => navigate("/dashboard/pending-bookings")}
        ></i>
      </div>
      {booking.message && (
        <FlashMessage
          message={booking.message.message}
          isSuccess={booking.message.success}
          clearMessage={booking.clearMessage}
        />
      )}
      <BookingTable bookings={booking.data} openApproveModal={handleModal} />
      {booking.isLoading && (
        <div className="loader">
          <img src={loaderPicture} width={100} height={100} />
        </div>
      )}

      {openApproveModal && (
        <ApproveBookingModal
          allBookings={booking.data}
          bookingIndex={clickedRow}
          closeModal={handleModal}
          animate={animation}
          status={status}
        />
      )}

      <PaginationLinks
        count={booking.links.count}
        next={booking.links.next}
        previous={booking.links.previous}
        setPage={booking.setPage}
        page={booking.page}
      />
    </div>
  );
}

export default PendingBookings;
