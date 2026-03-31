import React, { useState, useMemo, useEffect } from "react";
import api from "../api/api";
import BookCard from "../components/BookCard";

const Home = () => {
  /* ---------- STATE ---------- */
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("popular");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* ---------- FETCH BOOKS ---------- */
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const res = await api.get("/products");
        setBooks(res.data);
      } catch (err) {
        setError("Failed to fetch books");
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  /* ---------- FILTER + SORT ---------- */
  const filteredBooks = useMemo(() => {
    let filtered = [...books].filter((book) =>
      book.title?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (sortOption === "low") {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortOption === "high") {
      filtered.sort((a, b) => b.price - a.price);
    } else if (sortOption === "rating") {
      filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
    }

    return filtered;
  }, [books, searchTerm, sortOption]);

  /* ---------- UI STATES ---------- */
  if (loading) return <p className="text-center mt-5">Loading...</p>;
  if (error) return <p className="text-center text-danger mt-5">{error}</p>;

  /* ---------- MAIN UI ---------- */
  return (
    <div className="container mt-5">

      {/* HERO */}
      <div className="mb-5">
        <h1 className="fw-bold mb-2">
          Discover Books That Upgrade Your Thinking
        </h1>
        <p className="text-muted mb-0">
          Curated collection of productivity, mindset and career-changing books.
        </p>
      </div>

      {/* SEARCH + SORT */}
      <div className="d-flex flex-column flex-md-row justify-content-between align-items-md-center gap-3 mb-4">

        <input
          type="text"
          className="form-control"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ maxWidth: "350px" }}
        />

        <div className="d-flex align-items-center gap-3">
          <span className="text-muted small">
            Showing {filteredBooks.length} results
          </span>

          <select
            className="form-select form-select-sm"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
            style={{ width: "180px" }}
          >
            <option value="popular">Sort: Popular</option>
            <option value="rating">Sort: Rating</option>
            <option value="low">Price: Low to High</option>
            <option value="high">Price: High to Low</option>
          </select>
        </div>

      </div>

      {/* BOOK GRID */}
      {filteredBooks.length === 0 ? (
        <p className="text-center text-muted">
          No books found for "{searchTerm}"
        </p>
      ) : (
        <div className="row g-4">
          {filteredBooks.map((book) => (
            <div
              key={book._id}
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