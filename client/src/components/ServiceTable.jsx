import { formatToDateString, convertToDateTime } from "../utils/dateFormat.mjs";

export default function ServiceTable({
  services,
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
          <th>Category</th>
          <th>Photos</th>
          <th>Date Created</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {services.length > 0 ? (
          services.map((service, index) => {
            return (
              <tr key={index + 1}>
                <td data-cell="#">{index + 1}.</td>
                <td data-cell="Name">{service.name}</td>
                <td data-cell="service">{service.category_name}</td>
                <td data-cell="Photo">
                  <i
                    className="fa-solid fa-arrow-up-right-from-square"
                    onClick={() => openPhotoModal(index, "photos")}
                  ></i>
                </td>
                <td data-cell="Date">
                  {convertToDateTime(service.created_at)}
                </td>
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
            <td colSpan={6} style={{ textAlign: "center", color: "red" }}>
              No data
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
}
