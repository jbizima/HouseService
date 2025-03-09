import Button from "./ui/Button";
import { addComma } from "../utils/addComma.mjs";
import { formatToDateString } from "../utils/dateFormat.mjs";
import useDeleteCategory from "../hooks/useDeleteCategory";

export default function DeleteCategoryModal({
  closeModal,
  allCategories,
  categoryIndex,
  animate,
}) {
  const category = allCategories[categoryIndex]
    ? allCategories[categoryIndex]
    : {
        name: "",
        description: "",
        created_at: "",
      };
  const { submitForm } = useDeleteCategory(category, closeModal, categoryIndex);

  const handleCloseModal = (e) => {
    if (e.target.className == `modal ${animate}`) {
      closeModal(categoryIndex, "delete");
    }
  };

  return (
    <div className={`modal ${animate}`} onClick={handleCloseModal}>
      <div className="modal-content delete-modal">
        <div className="modal-header">
          <h2>{category.name}</h2>
          <div
            className="modal-close-button"
            onClick={() => closeModal(categoryIndex, "delete")}
          >
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>

        <div className="modal-body">
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Name</span>
            <span>{category.name}</span>
          </div>

          <div className="info">
            <span style={{ fontWeight: "bold" }}>Description: </span>
            <span>{category.description}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Created date</span>
            <span>{formatToDateString(category.created_at)}</span>
          </div>
        </div>
        <div className="modal-footer">
          <div className="delete-options" style={{ gap: "10px" }}>
            <Button
              text="Cancel"
              className="btn-danger-outline"
              onClick={() => closeModal(categoryIndex, "delete")}
            />

            <Button text="Delete" className="btn-danger" onClick={submitForm} />
          </div>
        </div>
      </div>
    </div>
  );
}
