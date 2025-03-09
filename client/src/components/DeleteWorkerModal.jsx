import Button from "./ui/Button";
import { addComma } from "../utils/addComma.mjs";
import { formatToDateString } from "../utils/dateFormat.mjs";
import useDeleteWorker from "../hooks/useDeleteWorker";

export default function DeleteWorkerModal({
  closeModal,
  allWorkers,
  workerIndex,
  animate,
}) {
  const worker = allWorkers[workerIndex]
    ? allWorkers[workerIndex]
    : {
        name: "",
        price: "",
        address: "",
        email: "",
        phone: "",
        created_at: "",
      };
  const { submitForm } = useDeleteWorker(worker, closeModal, workerIndex);

  const handleCloseModal = (e) => {
    if (e.target.className == `modal ${animate}`) {
      closeModal(workerIndex, "delete");
    }
  };

  return (
    <div className={`modal ${animate}`} onClick={handleCloseModal}>
      <div className="modal-content delete-modal">
        <div className="modal-header">
          <h2>{worker.name}</h2>
          <div
            className="modal-close-button"
            onClick={() => closeModal(workerIndex, "delete")}
          >
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>

        <div className="modal-body">
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Name</span>
            <span>{worker.name}</span>
          </div>

          <div className="info">
            <span style={{ fontWeight: "bold" }}>Contacts: </span>
            <span>{worker.email} || {worker.phone}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Service: </span>
            <span>{worker.service_name}</span>
          </div>
          <div className="info">
            <span style={{ fontWeight: "bold" }}>Created date</span>
            <span>{formatToDateString(worker.created_at)}</span>
          </div>
        </div>
        <div className="modal-footer">
          <div className="delete-options" style={{ gap: "10px" }}>
            <Button
              text="Cancel"
              className="btn-danger-outline"
              onClick={() => closeModal(workerIndex, "delete")}
            />

            <Button text="Delete" className="btn-danger" onClick={submitForm} />
          </div>
        </div>
      </div>
    </div>
  );
}
