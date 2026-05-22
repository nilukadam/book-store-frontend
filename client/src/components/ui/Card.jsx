import React from "react";

const Card = ({
  children,
  className = "",
}) => {

  /* ---------- CLASS GENERATION ---------- */

  const cardClasses = [
    "card",
    "bn-card",
    className
   ].join(" ");

  /* ---------- MAIN UI ---------- */

  return (
    <div className={cardClasses}>
      <div className="card-body">
        {children}
      </div>
    </div>
  );

};

export default Card;