import React from "react";

/*
  BookDetails Page
  ----------------
  Purpose:
  - Show full details of a single book
  - Clean layout with image on left and info on right
  - No logic change, only UI structure
*/

const BookDetails = ({ book }) => {
  /*
    Safety check:
    If book data is not available, show nothing.
    (UI safety, not logic change)
  */
  if (!book) {
    return <div className="container mt-5">Book not found</div>;
  }

  return (
    <div className="container mt-5">
      {/* Main layout row */}
      <div className="row align-items-start">

        {/* LEFT SIDE : Book Image */}
        <div className="col-md-5 text-center mb-4 mb-md-0">
          <img
            src={book.image}
            alt={book.title}
            className="img-fluid rounded"
          />
        </div>

        {/* RIGHT SIDE : Book Information */}
        <div className="col-md-7">

          {/* Book Title */}
          <h2 className="book-title mb-2">
            {book.title}
          </h2>

          {/* Author Name */}
          <p className="text-muted mb-3">
            by {book.author}
          </p>

          {/* Price */}
          <p className="book-price mb-4">
            ₹{book.price}
          </p>

          {/* Action Buttons */}
          <div className="d-flex gap-3">
            <button className="btn btn-primary">
              Add to Cart
            </button>

            <button className="btn btn-outline-secondary">
              Buy Now
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default BookDetails;
