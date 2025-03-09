import Button from "./ui/Button";
import InputField from "./ui/InputField";
import useFetchAll from "../hooks/useFetchAll";
import useEditWorker from "../hooks/useEditWorker";

export default function EditWorkerModal({
  closeModal,
  allWorkers,
  workerIndex,
  animate,
}) {
  const { data } = useFetchAll("/api/services/no_pagination/");
  const worker = allWorkers[workerIndex];
  const {
    form,
    fieldError,
    handleChange,
    validateSubmitForm: submitForm,
  } = useEditWorker(worker, closeModal, workerIndex);

  const handleCloseModal = (e) => {
    if (e.target.className == `modal ${animate}`) {
      closeModal(workerIndex, "edit");
    }
  };
  return (
    <div className={`modal ${animate}`} onClick={handleCloseModal}>
      <div className="modal-content ">
        <div className="modal-header">
          <h4>Update worker</h4>
          <div
            className="modal-close-button"
            onClick={() => closeModal(workerIndex, "edit")}
          >
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>

        <div className="modal-body">
          <form
            onSubmit={submitForm}
            className="category-form"
            encType="multipart/form-data"
          >
            <div className="form-row">
              <div className="form-col">
                {fieldError.service && (
                  <i className="error-text">{fieldError.service}</i>
                )}
                <div
                  className={`input-group ${
                    fieldError.service && "error-field"
                  }`}
                >
                  <span className="input-icon">
                    <i className="fa-solid fa-list"></i>
                  </span>
                  <select
                    name="service"
                    value={form.service}
                    onChange={handleChange}
                    errorfield={fieldError.service && "error-field"}
                    id="service"
                    className="input-field"
                  >
                    <option value="" key={0}>
                      Select Service............
                    </option>
                    {data.map((service, _) => {
                      return (
                        <option value={service.id} key={service.id}>
                          {service.name}
                        </option>
                      );
                    })}
                  </select>
                  <span className="input-text">Service</span>
                </div>
              </div>
              <div className="form-col">
                {fieldError.name && (
                  <i className="error-text">{fieldError.name}</i>
                )}
                <InputField
                  // type="text"
                  name="name"
                  id="name"
                  errorfield={fieldError.name && "error-field"}
                  label="Name"
                  icon="fa-solid fa-user"
                  placeholder="Name"
                  handleChange={handleChange}
                  value={form.name}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                {fieldError.phone && (
                  <i className="error-text">{fieldError.phone}</i>
                )}
                <InputField
                  // type="text"
                  name="phone"
                  type="number"
                  id="phone"
                  errorfield={fieldError.phone && "error-field"}
                  label="Phone"
                  icon="fa-solid fa-phone"
                  placeholder="Phone number"
                  handleChange={handleChange}
                  value={form.phone}
                />
              </div>
              <div className="form-col">
                {fieldError.email && (
                  <i className="error-text">{fieldError.email}</i>
                )}
                <InputField
                  // type="text"
                  name="email"
                  type="email"
                  id="email"
                  errorfield={fieldError.email && "error-field"}
                  label="Email"
                  icon="fa-solid fa-envelope"
                  placeholder="Email"
                  handleChange={handleChange}
                  value={form.email}
                />
              </div>
            </div>
            <div className="form-row">
              <div className="form-col">
                {fieldError.price && (
                  <i className="error-text">{fieldError.price}</i>
                )}
                <InputField
                  // type="text"
                  name="price"
                  id="price"
                  errorfield={fieldError.price && "error-field"}
                  label="Price"
                  icon="fa-solid fa-dollar-sign"
                  placeholder="price"
                  handleChange={handleChange}
                  value={form.price}
                />
              </div>
              <div className="form-col">
                {fieldError.address && (
                  <i className="error-text">{fieldError.address}</i>
                )}
                <InputField
                  // type="text"
                  name="address"
                  id="address"
                  errorfield={fieldError.address && "error-field"}
                  label="Address"
                  icon="fa-solid fa-location-dot"
                  placeholder="address"
                  handleChange={handleChange}
                  value={form.address}
                />
              </div>
            </div>

            <Button text="Submit" className="btn-primary" />
          </form>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
}
