import { addComma } from "@/utils/addComma.mjs";
export default function MyBookingsTable({ bookings }) {
  return (
    <table className="dashboard-content-table">
      {/* <caption>categorie/Coffe List</caption> */}
      <thead>
        <tr>
          <th>#</th>
          <th>Worker</th>
          <th>Service</th>
          <th>Price</th>
          <th>Appointment</th>
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
                <td data-cell="Name">{booking.worker_name}</td>
                <td data-cell="service">{booking.service_name}</td>
                <td data-cell="service">
                  <span
                    className="text-succ"
                    style={{ fontWeight: "bold", color: "#096609" }}
                  >
                    {addComma(booking.worker_price)}
                  </span>{" "}
                  Rwf/Session
                </td>
                <td data-cell="Date">
                  {booking.date_booking + " at " + booking.time}
                </td>
                <td data-cell="Action">
                  <div className="action-btns">{button}</div>
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
