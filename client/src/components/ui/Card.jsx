import { useState } from "react";
import React from "react";
const Card = ({ children, className = "" }) => {
  return (
      <div className="card-body">
        {children}
      </div>
  );
};

export default Card;
