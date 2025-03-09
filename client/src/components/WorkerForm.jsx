import Button from "./ui/Button";
import InputField from "./ui/InputField";
import ButtonLoading from "./ui/ButtonLoading";
import FlashMessage from "./ui/FlashMessage";
import loadingImg from "/images/b-loading-3.gif";
import InputFile from "./ui/InputFile";
import useFetchAll from "../hooks/useFetchAll";

export default function WorkerForm({
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
  const { data } = useFetchAll("/api/services/no_pagination/");
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
          <div className="form-row">
            <div className="form-col">
              {fieldError.service && (
                <i className="error-text">{fieldError.service}</i>
              )}
              <div
                className={`input-group ${fieldError.service && "error-field"}`}
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
                type="text"
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
          <div className="form-row">
            <div className="form-col">
              {fieldError.username && (
                <i className="error-text">{fieldError.username}</i>
              )}
              <InputField
                // type="text"
                name="username"
                id="username"
                errorfield={fieldError.username && "error-field"}
                label="username"
                icon="fa-solid fa-location-dot"
                placeholder="username"
                handleChange={handleChange}
                value={form.username}
              />
            </div>
            <div className="form-col">
              {fieldError.file && (
                <i className="error-text">{fieldError.file}</i>
              )}
              <InputFile
                name="file"
                id="file"
                errorfield={fieldError.file && "error-field"}
                label="file"
                icon="fa fa-upload"
                placeholder="file"
                handleChange={handleFile}
              />
            </div>
          </div>

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
