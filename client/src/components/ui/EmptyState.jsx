/*
  EmptyState UI Component

  Purpose:
  - Display consistent empty screens
  - Reusable across pages (Cart, Orders, etc.)
*/

import React from "react";

const EmptyState = ({
  title,
  message,
  action
}) => {

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (

    <div className="empty-state text-center py-5">

      {title && (

        <h4 className="empty-state-title mb-2">
          {title}
        </h4>

      )}

      {message && (

        <p className="empty-state-message text-muted mb-3">
          {message}
        </p>

      )}

      {action && (

        <div className="empty-state-action">
          {action}
        </div>

      )}

    </div>

  );

};

export default EmptyState;