import Button from "./ui/Button";
import InputField from "./ui/InputField";
import useEditCategory from "../hooks/useEditCategory";
import Textarea from "./ui/Textarea";
export default function EditCategoryModal({
  closeModal,
  allCategories,
  categoryIndex,
  animate,
}) {
  const category = allCategories[categoryIndex];
  const {
    form,
    fieldError,
    handleChange,
    validateSubmitForm: submitForm,
  } = useEditCategory(category, closeModal, categoryIndex);

  const handleCloseModal = (e) => {
    if (e.target.className == `modal ${animate}`) {
      closeModal(categoryIndex, "edit");
    }
  };
  return (
    <div className={`modal ${animate}`} onClick={handleCloseModal}>
      <div className="modal-content ">
        <div className="modal-header">
          <h4>Update Category</h4>
          <div
            className="modal-close-button"
            onClick={() => closeModal(categoryIndex, "edit")}
          >
            <i className="fa fa-rectangle-xmark"></i>
          </div>
        </div>

        <div className="modal-body">
          <form onSubmit={submitForm} className="category-form">
            Name:
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
            Description:
            {fieldError.description && (
              <i className="error-text">{fieldError.description}</i>
            )}
            <Textarea
              name="description"
              id="description"
              label="description"
              placeholder="Descritpion ....."
              height="50px"
              errorfield={fieldError.description && "error-field"}
              value={form.description}
              handleChange={handleChange}
            />

            <Button text="Submit" className="btn-primary" />
          </form>
        </div>
        <div className="modal-footer"></div>
      </div>
    </div>
  );
}
