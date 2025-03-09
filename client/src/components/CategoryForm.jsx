import Button from "./ui/Button";
import InputField from "./ui/InputField";
import ButtonLoading from "./ui/ButtonLoading";
import FlashMessage from "./ui/FlashMessage";
import loadingImg from "/images/b-loading-3.gif";
import InputFile from "./ui/InputFile";
import Textarea from "./ui/Textarea";

export default function CategoryForm({
  message,
  isLoading,
  form,
  handleChange,
  submitForm,
  clearMessage,
  fieldError,
  handleFile,
  files,
  removeFile,
}) {
  return (
    <div className="card">
      <div className="card-header">Service Category Form</div>
      {message && (
        <FlashMessage
          message={message.message}
          isSuccess={message.success}
          clearMessage={clearMessage}
        />
      )}
      <div className="card-body">
        <form
          onSubmit={submitForm}
          className="category-form"
          encType="multipart/form-data"
        >
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
          {fieldError.files && <i className="error-text">{fieldError.files}</i>}
          <InputFile
            name="files"
            id="files"
            errorfield={fieldError.files && "error-field"}
            label="files"
            icon="fa fa-upload"
            placeholder="files"
            handleChange={handleFile}
          />

          <ul style={{ margin: "auto" }}>
            {files.length > 0 &&
              [...files].map((item, i) => {
                return (
                  <li key={i} className="li-row">
                    <span>{item.name}</span>{" "}
                    <i
                      className="fa fa-times text-danger"
                      onClick={() => removeFile(i)}
                    ></i>
                  </li>
                );
              })}
          </ul>

          {isLoading ? (
            <ButtonLoading
              text="Submit"
              className="btn-primary"
              img={loadingImg}
            />
          ) : (
            <Button text="Submit" className="btn-primary" />
          )}
        </form>
      </div>
      <div className="card-footer"></div>
    </div>
  );
}
