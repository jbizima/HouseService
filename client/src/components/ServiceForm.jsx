import Button from "./ui/Button";
import InputField from "./ui/InputField";
import ButtonLoading from "./ui/ButtonLoading";
import FlashMessage from "./ui/FlashMessage";
import loadingImg from "/images/b-loading-3.gif";
import InputFile from "./ui/InputFile";
import Textarea from "./ui/Textarea";
import useFetchAll from "../hooks/useFetchAll";

export default function ServiceForm({
  message,
  isLoading,
  form,
  handleChange,
  submitForm,
  clearMessage,
  fieldError,
  handleFile,
  file,
  removeFile,
}) {
  const { data } = useFetchAll("/api/categories/no_pagination/");
  return (
    <div className="card">
      <div className="card-header">Service Form</div>
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
                Select Category............
              </option>
              {data.length> 0 && data.map((category, _) => {
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
            icon="fa-solid fa-toolbox"
            placeholder="Name"
            handleChange={handleChange}
            value={form.name}
          />

          {fieldError.file && <i className="error-text">{fieldError.file}</i>}
          <InputFile
            name="file"
            id="file"
            errorfield={fieldError.file && "error-field"}
            label="file"
            icon="fa fa-upload"
            placeholder="file"
            handleChange={handleFile}
          />

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
