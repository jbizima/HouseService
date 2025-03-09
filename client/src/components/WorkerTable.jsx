import { formatToDateString, convertToDateTime } from "../utils/dateFormat.mjs";
import {addComma} from "../utils/addComma.mjs"

export default function WorkerTable({
  workers,
  openEditModal,
  openDeleteModal,
  openPhotoModal,
}) {
  return (
    <table className="dashboard-content-table">
      {/* <caption>categorie/Coffe List</caption> */}
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Contacts</th>
          <th>Price</th>
          <th>service</th>
          <th>Photos</th>
          <th>Address</th>
          {/* <th>Date Created</th> */}
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {workers.length > 0 ? (
          workers.map((worker, index) => {
            return (
              <tr key={index + 1}>
                <td data-cell="#">{index + 1}.</td>
                <td data-cell="Name">{worker.name}</td>
                <td data-cell="contact">
                  {worker.email} || {worker.phone}
                </td>
                <td data-cell="price">{addComma(worker.price)} Rwf</td>
                <td data-cell="service">{worker.service_name}</td>
                <td data-cell="Photo">
                  <i
                    className="fa-solid fa-arrow-up-right-from-square"
                    onClick={() => openPhotoModal(index, "photos")}
                  ></i>
                </td>
                <td data-cell="address">{worker.address}</td>
                {/* <td data-cell="Date">{convertToDateTime(worker.created_at)}</td> */}
                <td data-cell="Action">
                  <div className="action-btns">
                    <i
                      className="fa fa-pen-to-square text-primary"
                      onClick={() => openEditModal(index, "edit")}
                    ></i>{" "}
                    <i
                      className="fa fa-trash-can text-danger"
                      onClick={() => openDeleteModal(index, "delete")}
                    ></i>
                  </div>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td colSpan={8} style={{ textAlign: "center", color: "red" }}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
