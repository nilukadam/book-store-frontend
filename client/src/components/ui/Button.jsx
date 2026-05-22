import React from "react";

const Button = ({
  children,

  variant = "primary",
  size = "md",

  disabled = false,

  className = "",

  type = "button",

  ...props 
}) => {

  /* ---------- CLASS GENERATION ---------- */

  const buttonClasses = [
    "btn",
    `btn-${variant}`,
    `btn-${size}`,
    "bn-btn",
    className
  ].join(" ");

  /* ---------- MAIN UI ---------- */

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );

};

export default Button;