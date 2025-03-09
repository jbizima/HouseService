import Button from "../ui/Button";
import useApproveBooking from "@/hooks/useApproveBooking";

export default function ApproveBookingModal({
  closeModal,
  allBookings,
  bookingIndex,
  animate,
  status,
}) {
  const booking = allBookings[bookingIndex]
    ? allBookings[bookingIndex]
    : {
        client_firstname: "",
        service_name: "",
        date_booking: "",
        time: "",
      };

  const { submitForm } = useApproveBooking(booking, closeModal, bookingIndex);

  const handleCloseModal = (e) => {
    if (e.target.className == `modal ${animate}`) {
      closeModal(bookingIndex);
    }
  };

  return (
    <div className={`modal ${animate}`} onClick={handleCloseModal}>
      <div className="modal-content delete-modal">
        <div className="modal-header">
          <h2>{status == "approve" ? "Approval" : "Desapproval"}</h2>
          <div
            className="modal-close-button"
            onClick={() => closeModal(bookingIndex, "delete")}
          >
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>

        <div className="modal-body">
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Client</span>
            <span>{booking.client_firstname && booking.client_firstname}</span>
          </div>

          <div className="info">
            <span style={{ fontWeight: "bold" }}>Service: </span>
            <span>{booking.service_name && booking.service_name}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>date</span>
            <span>
            
              {booking.date_booking &&
                booking.date_booking + " at " + booking.time}
            </span>
          </div>
        </div>
        <div className="modal-footer">
          {status == "denied" ? (
            <div className="delete-options" style={{ gap: "10px" }}>
              <Button
                text="Cancel"
                className="btn-danger-outline"
                onClick={() => closeModal(bookingIndex)}
              />

              <Button
                text="Denied"
                className="btn-danger"
                onClick={() => submitForm("3")}
              />
            </div>
          ) : (
            <div className="delete-options" style={{ gap: "10px" }}>
              <Button
                text="Cancel"
                className="btn-danger-outline"
                onClick={() => closeModal(bookingIndex)}
              />

              <Button
                text="Approve"
                className="btn-primary"
                onClick={() => submitForm("2")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
