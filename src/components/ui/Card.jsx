/*
  Card UI Component

  Purpose:
  - Standard container for sections
  - Reusable across pages
*/

const Card = ({ children, className = "" }) => {
    return (
      <div className={`card mb-3 ${className}`}>
        <div className="card-body">
          {children}
        </div>
      </div>
    );
  };
  
  export default Card;
  