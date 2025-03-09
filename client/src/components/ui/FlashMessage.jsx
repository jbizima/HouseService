import { useState } from "react";
import ProgressBar from "./ProgressBar";

export default function FlashMessage({ isSuccess, message, clearMessage }) {
  const [ani, setAni] = useState('')
  const className = isSuccess
    ? "success-message animated bounce"
    : "error-message animated shake";
  let errors = null;
  if (typeof message === "object") {
    const errorList = Object.entries(message);

    errors = errorList.map((item) => {
      console.log(typeof item[1]);
      return (
        <div className={className}>
          <h5>{item[0]} : </h5>
          <ul
            style={{
              fontSize: 12,
              listStyleType: "square",
              paddingLeft: "30px",
              lineHeight: "15px",
            }}
          >
            {typeof item[1] == "object"
              ? Object.values(item[1]).map((subItem, key) => {
                  return <li key={key}>{subItem}</li>;
                })
              : item[1].map((subItem, key) => {
                  return <li key={key}>{subItem}</li>;
                })}
          </ul>
        </div>
      );
    });
  } else {
    errors = message;
  }

  return (
    <div className={`${className} ${ani}`}>
      <div style={{ padding: "5px" }}>
        {isSuccess ? <p>{message}</p> : errors}
      </div>

      <ProgressBar
        color={isSuccess ? "#b16e0a" : "#665252c7"}
        clearMessage={clearMessage}
        setAni = {setAni}
      />
    </div>
  );
}
