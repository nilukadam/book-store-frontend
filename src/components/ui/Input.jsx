/*
  Input UI Component

  Purpose:
  - Standard input with label and error support
  - UI only (logic handled by page)
*/
import React from "react";

const Input = ({
    label,
    error,
    className = "",
    ...props
  }) => {
    return (
      <div className="mb-3">
        {label && (
          <label className="form-label fw-medium">
            {label}
          </label>
        )}
  
        <input
          className={`form-control ${error ? "is-invalid" : ""} ${className}`}
          {...props}
        />
  
        {error && (
          <div className="invalid-feedback">
            {error}
          </div>
        )}
      </div>
    );
  };
  
  export default Input;
  