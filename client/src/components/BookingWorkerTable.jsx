import { convertToDateTime, formatToDateString } from "@/utils/dateFormat.mjs";
import { addComma } from "@/utils/addComma.mjs";
export default function BookingWorkerTable({ workers, from, to }) {
  return (
    <table className="dashboard-content-table">
      {/* <caption>categorie/Coffe List</caption> */}
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th style={{ textAlign: "center" }}>Booking Info</th>
        </tr>
      </thead>
      <tbody>
        {workers.length > 0 ? (
          workers.map((worker, index) => {
            let rows = worker.worker_bookings.length;
            const bookingList = worker.worker_bookings.filter((item, _)=>{
              if(item.date_booking>= from && item.date_booking<= to){
                return true
              }
            })

            if (rows > 0) {
              let amountPaid = bookingList.filter((item, _) => {
                return item.status == "2";
              });
              let totalAmount = amountPaid.reduce(function (result, item) {
                return result + item.worker_price;
              }, 0);
              let percent = totalAmount * 0.15;

              return (
                <tr key={index + 1}>
                  <td data-cell="#" >
                    {index + 1}.
                  </td>
                  <td data-cell="worker" >
                    {worker.name}
                  </td>
                  

                  <td className="td-details">
                    <div className="td-head">
                      <span>Client</span>
                      <span>Service</span>
                      <span>Amount</span>
                      <span>Date</span>
                      <span>Status</span>
                    </div>

                    {bookingList.map((booking, b_id) => {
                      let button = null;
                      if (booking.status == "1") {
                        button = <i className="fa fa-spinner text-primary"></i>;
                      }
                      if (booking.status == "2") {
                        button = (
                          <i className="fa fa-square-check text-success"></i>
                        );
                      }
                      if (booking.status == "3") {
                        button = (
                          <i className="fa fa-square-xmark text-danger"></i>
                        );
                      }
                      return (
                        <div key={b_id} className="td-body">
                          <span data-cell="client">
                            {booking.client_firstname}-{booking.client_lastname}
                          </span>
                          <span data-cell="service">
                            {booking.service_name}
                          </span>
                          <span data-cell="Income">
                            {booking.worker_price} Rwf
                          </span>
                          <span data-cell="Date">
                            {booking.date_booking + " at " + booking.time}
                          </span>

                          <span data-cell="Action">
                            <div className="action-btns">{button}</div>
                          </span>
                        </div>
                      );
                    })}
                    <div className="td-footer">
                      <span>
                        Total amount:{" "}
                        <span style={{ color: "green", fontWeight: "bolder" }}>
                          {addComma(totalAmount)}
                        </span>{" "}
                        frw
                      </span>
                      <span>
                        Income(15%):{" "}
                        <span style={{ color: "green", fontWeight: "bolder" }}>
                          {addComma(percent)}
                        </span>{" "}
                        frw
                      </span>
                    </div>
                  </td>
                </tr>
              );
            }
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
