import { useState } from "react";
import "./index.css";

const FormInput = (props) => {
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const [focused, setFocused] = useState(false);

  const onHandleFocus = (event) => {
    setFocused(true);
  };

  const linkClassName = label === "LINK" ? "link-input-field" : "";

  return (
    <div className="input-container">
      <label className="input-label" htmlFor={`${label}`}>
        {label}
      </label>
      {label === "DESCRIPTION" ? (
        <textarea
          className="input-field"
          {...inputProps}
          id={`${label}`}
          onChange={onChange}
          onBlur={onHandleFocus}
          focused={focused.toString()}
        />
      ) : (
        <input
          className={`input-field ${linkClassName}`}
          {...inputProps}
          id={`${label}`}
          onChange={onChange}
          onBlur={onHandleFocus}
          focused={focused.toString()}
        />
      )}
      <span className="error-message">{errorMessage}</span>
    </div>
  );
};

export default FormInput;
