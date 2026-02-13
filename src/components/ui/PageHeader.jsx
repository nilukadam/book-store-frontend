/*
  PageHeader UI Component

  Purpose:
  - Standard page title across app
  - Optional subtitle for context
*/
import React from "react";

const PageHeader = ({ title, subtitle }) => {
    return (
      <div className="mb-4">
        <h2 className="fw-bold">{title}</h2>
  
        {subtitle && (
          <p className="text-muted mb-0">
            {subtitle}
          </p>
        )}
      </div>
    );
  };
  
  export default PageHeader;
  