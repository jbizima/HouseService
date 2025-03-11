import { convertToDateTime, formatToDateString } from "@/utils/dateFormat.mjs";
import { addComma } from "@/utils/addComma.mjs";
export default function BookingReportTable({ bookings, page }) {
  let totalIncome = 0;
  return (
    <table className="dashboard-content-table">
      {/* <caption>categorie/Coffe List</caption> */}
      <thead>
        <tr>
          <th>#</th>
          <th>Client</th>
          <th>Service</th>
          {page != "reports" && <th>Worker</th>}

          <th>Appointment</th>
          <th>Amount</th>
          {page == "reports" && <th>Income (15%)</th>}
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
              totalIncome += booking.worker_price * 0.15;
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
                {page != "reports" && (
                  <td data-cell="service">
                    {booking.worker_name} [
                    <span style={{ fontSize: "11px" }}>
                      {booking.worker_email}
                    </span>
                    ]
                  </td>
                )}
                <td data-cell="Date">
                  {booking.date_booking + " at " + booking.time}
                </td>
                <td data-cell="amount">{addComma(booking.worker_price)} Rwf</td>
                {page == "reports" && (
                  <td
                    data-cell="income"
                    style={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {booking.status == "2"
                      ? addComma(booking.worker_price * 0.15) + " Rwf"
                      : "-"}
                  </td>
                )}
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
      <tfoot>
        <tr>
          <td colSpan={7} style={{ textAlign: "center" }}>
            <span>
              Total Income(15%):{" "}
              <span style={{ color: "green", fontWeight: "bolder" }}>
                {addComma(totalIncome)}
              </span>{" "}
              frw
            </span>
          </td>
        </tr>
      </tfoot>
    </table>
  );
}
