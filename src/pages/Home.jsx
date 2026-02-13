import React, { useState } from "react";

import booksData from "../data/books";
import BookCard from "../components/BookCard";

const Home = () => {
  /* -------------------- STATE -------------------- */
  const [searchTerm, setSearchTerm] = useState("");

  /* -------------------- DERIVED DATA -------------------- */
  const filteredBooks = booksData.filter((book) =>
    book.title
      ?.toLowerCase()
      .includes(searchTerm.toLowerCase())
  );

  /* -------------------- MAIN UI -------------------- */
  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Books</h2>

      {/* Search Input */}
      <input
        type="text"
        className="form-control form-control-sm mb-4"
        placeholder="Search books on this page..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* Books Grid */}
      {filteredBooks.length === 0 ? (
        <p className="text-center text-muted">
          No books found for "{searchTerm}"
        </p>
      ) : (
        <div className="row g-4">
          {filteredBooks.map((book) => (
            <div
              key={book.id}
              className="col-12 col-sm-6 col-lg-4 col-xl-3"
            >
              <BookCard book={book} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
