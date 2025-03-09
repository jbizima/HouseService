export default function InputField({
  type,
  name,
  id,
  placeholder,
  label,
  value,
  handleChange,
  icon,
  errorfield,
  height,
  width,
  errorMessage,
  readOnly
}) {
  const inputWidth = width ? width : "100%";
  return (
    <>
      {errorMessage && <i className="error-text">{errorMessage}</i>}
      <div
        className={`input-group ${errorfield && "error-field"} input-report`}
        style={{ height: height, width: inputWidth }}
      >
        <span className="input-icon" style={{display:"flex",alignItems:"center"}}>
          <i className={icon}></i>
        </span>
        <input
          type={type}
          name={name}
          id={id}
          onChange={handleChange}
          placeholder={placeholder}
          value={value}
          className="input-field"
          readOnly={readOnly}
        />
        <span className="input-text" style={{display:"flex",alignItems:"center"}}>{label}</span>
      </div>
    </>
  );
}
