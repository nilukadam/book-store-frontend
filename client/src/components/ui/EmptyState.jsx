/*
  EmptyState UI Component

  Purpose:
  - Display consistent empty screens
  - Reusable across pages (Cart, Orders, etc.)
*/
import React from "react";

const EmptyState = ({ title, message, action }) => {
    return (
      <div className="text-center py-5">
        {title && <h4 className="mb-2">{title}</h4>}
  
        <p className="text-muted mb-3">
          {message}
        </p>
  
        {action && action}
      </div>
    );
  };
  
  export default EmptyState;
  