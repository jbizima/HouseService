import { formatToDateString, convertToDateTime } from "../utils/dateFormat.mjs";
import { addComma } from "../utils/addComma.mjs";
export default function BookingTable({ bookings, openApproveModal }) {
  return (
    <table className="dashboard-content-table">
      {/* <caption>categorie/Coffe List</caption> */}
      <thead>
        <tr>
          <th>#</th>
          <th>Client</th>
          <th>Service</th>
          <th>Worker</th>
          <th>Appointment</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => {
            return (
              <tr key={index + 1}>
                <td data-cell="#">{index + 1}.</td>
                <td data-cell="Name">
                  {booking.client_firstname}-{booking.client_lastname}
                </td>
                <td data-cell="service">{booking.service_name}</td>
                <td data-cell="service">
                  {booking.worker_name} [
                  <span style={{ fontSize: "11px" }}>
                    {booking.worker_email}
                  </span>
                  ]
                </td>
                <td data-cell="Date">
                  {booking.date_booking + " at " + booking.time}
                </td>
                <td data-cell="Action">
                  {/* <div className="action-btns">
                    <i
                      className="fa fa-square-check text-primary"
                      onClick={() => openApproveModal(index, "approve")}
                    ></i>{" "}
                    <i
                      className="fa fa-square-xmark text-danger"
                      onClick={() => openApproveModal(index, "denied")}
                    ></i>
                  </div> */}
                  -
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={6} style={{ textAlign: "center", color: "red" }}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
