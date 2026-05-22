import React from "react";

const Input = ({
  label,
  error,
  className = "",
  ...props
}) => {

  /* ---------- CLASS GENERATION ---------- */

  const inputClasses = `
    form-control
    bn-input
    ${error ? "is-invalid" : ""}
    ${className}
  `;

  /* ---------- MAIN UI ---------- */

  return (
    <div className="mb-3">

      {label && (
        <label className="form-label fw-medium bn-label">
          {label}
        </label>
      )}

      <input
        className={inputClasses}
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