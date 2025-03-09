import { formatToDateString, convertToDateTime } from "../utils/dateFormat.mjs";
import { addComma } from "../utils/addComma.mjs";
export default function CategoyTable({
  categories,
  openEditModal,
  openDeleteModal,
  openPhotosModal,
}) {
  return (
    <table className="dashboard-content-table">
      {/* <caption>categorie/Coffe List</caption> */}
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Description</th>
          <th>Photos</th>
          <th>Date Created</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {categories.length > 0 ? (
          categories.map((category, index) => {
            let description = category.description;
            if (description.length > 20) {
              let end_index = description.indexOf(" ", 20) + 1;
              if (end_index) {
                description = description.slice(0, end_index) + "...";
              } else {
                description = category.description + "...";
              }
            }

            return (
              <tr key={index + 1}>
                <td data-cell="#">{index + 1}.</td>
                <td data-cell="Name">{category.name}</td>
                <td data-cell="Category">{description}</td>
                <td data-cell="Photo">
                  <i
                    className="fa-solid fa-arrow-up-right-from-square"
                    onClick={() => openPhotosModal(index, "photos")}
                  ></i>
                </td>
                <td data-cell="Date">
                  {convertToDateTime(category.created_at)}
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
