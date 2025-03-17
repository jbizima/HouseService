import Button from "./ui/Button";
import InputField from "./ui/InputField";
import useEditService from "../hooks/useEditService";
import useFetchAll from "../hooks/useFetchAll";

export default function EditServiceModal({
  closeModal,
  allServices,
  serviceIndex,
  animate,
}) {
  const { data } = useFetchAll("/api/categories/no_pagination/");
  const service = allServices[serviceIndex];
  const {
    form,
    fieldError,
    handleChange,
    validateSubmitForm: submitForm,
  } = useEditService(service, closeModal, serviceIndex);

  const handleCloseModal = (e) => {
    if (e.target.className == `modal ${animate}`) {
      closeModal(serviceIndex, "edit");
    }
  };
  return (
    <div className={`modal ${animate}`} onClick={handleCloseModal}>
      <div className="modal-content ">
        <div className="modal-header">
          <h4>Update service</h4>
          <div
            className="modal-close-button"
            onClick={() => closeModal(serviceIndex, "edit")}
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
            {fieldError.category && (
              <i className="error-text">{fieldError.category}</i>
            )}
            <div
              className={`input-group ${fieldError.category && "error-field"}`}
            >
              <span className="input-icon">
                <i className="fa-solid fa-list"></i>
              </span>
              <select
                name="category"
                value={form.category}
                onChange={handleChange}
                errorfield={fieldError.category && "error-field"}
                id="category"
                className="input-field"
              >
                <option value="" key={0}>
                  <option value={service.category} key={service.category}>
                    {service.category_name}
                  </option>
                </option>
                {data.map((category, _) => {
                  return (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  );
                })}
              </select>
              <span className="input-text">Category</span>
            </div>
            {fieldError.name && <i className="error-text">{fieldError.name}</i>}
            <InputField
              // type="text"
              name="name"
              id="name"
              errorfield={fieldError.name && "error-field"}
              label="Name"
              icon="fa-solid fa-layer-group"
              placeholder="Name"
              handleChange={handleChange}
              value={form.name}
            />

            <Button text="Submit" className="btn-primary" />
          </form>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
}
