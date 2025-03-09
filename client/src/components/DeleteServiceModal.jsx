import Button from "./ui/Button";
import { addComma } from "../utils/addComma.mjs";
import { formatToDateString } from "../utils/dateFormat.mjs";
import useDeleteService from "../hooks/useDeleteService";

export default function DeleteServiceModal({
  closeModal,
  allServices,
  serviceIndex,
  animate,
}) {
  const service = allServices[serviceIndex]
    ? allServices[serviceIndex]
    : {
        name: "",
        category_name: "",
        created_at: "",
      };
  const { submitForm } = useDeleteService(service, closeModal, serviceIndex);

  const handleCloseModal = (e) => {
    if (e.target.className == `modal ${animate}`) {
      closeModal(serviceIndex, "delete");
    }
  };

  return (
    <div className={`modal ${animate}`} onClick={handleCloseModal}>
      <div className="modal-content delete-modal">
        <div className="modal-header">
          <h2>{service.name}</h2>
          <div
            className="modal-close-button"
            onClick={() => closeModal(serviceIndex, "delete")}
          >
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>

        <div className="modal-body">
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Name</span>
            <span>{service.name}</span>
          </div>

          <div className="info">
            <span style={{ fontWeight: "bold" }}>Category: </span>
            <span>{service.category_name}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Created date</span>
            <span>{formatToDateString(service.created_at)}</span>
          </div>
        </div>
        <div className="modal-footer">
          <div className="delete-options" style={{ gap: "10px" }}>
            <Button
              text="Cancel"
              className="btn-danger-outline"
              onClick={() => closeModal(serviceIndex, "delete")}
            />

            <Button text="Delete" className="btn-danger" onClick={submitForm} />
          </div>
        </div>
      </div>
    </div>
  );
}
