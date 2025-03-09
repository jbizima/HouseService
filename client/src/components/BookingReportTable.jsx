import { convertToDateTime, formatToDateString } from "@/utils/dateFormat.mjs";
export default function BookingReportTable({ bookings }) {
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
          <th>Created at</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {bookings.length > 0 ? (
          bookings.map((booking, index) => {
            let button = null;
            if (booking.status == "1") {
              button = <i className="fa fa-spinner text-primary"></i>;
            }
            if (booking.status == "2") {
              button = <i className="fa fa-square-check text-success"></i>;
            }
            if (booking.status == "3") {
              button = <i className="fa fa-square-xmark text-danger"></i>;
            }
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
                <td data-cell="Date">{booking.date_booking + " at " + booking.time}</td>
                <td data-cell="Date_created">
                  {convertToDateTime(booking.created_at)}
                </td>
                <td data-cell="Action">
                  <div className="action-btns">{button}</div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={7} style={{ textAlign: "center", color: "red" }}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
