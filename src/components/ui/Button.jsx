/*
  Reusable UI Button component

  Rules:
  - UI only (no business logic)
  - Bootstrap based
  - Reusable across pages
*/

const Button = ({
  children,
  variant = "primary",
  disabled = false,
  className = "",
  type = "button",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`btn btn-${variant} ${className}`}
      disabled={disabled}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
