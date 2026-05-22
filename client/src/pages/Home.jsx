import React, {
  useState,
  useMemo,
  useEffect
} from "react";

import api from "../api/api";

import BookCard from "../components/BookCard";

const Home = () => {

  /* =====================================================
     STATE
  ===================================================== */

  const [books, setBooks] = useState([]);

  const [searchTerm, setSearchTerm] = useState("");

  const [sortOption, setSortOption] = useState("popular");

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* =====================================================
     FETCH BOOKS
  ===================================================== */

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

  /* =====================================================
     FILTER + SORT
  ===================================================== */

  const filteredBooks = useMemo(() => {

    let filtered = [...books].filter((book) =>
      book.title
        ?.toLowerCase()
        .includes(searchTerm.toLowerCase())
    );

    if (sortOption === "low") {

      filtered.sort((a, b) => a.price - b.price);

    } else if (sortOption === "high") {

      filtered.sort((a, b) => b.price - a.price);

    } else if (sortOption === "rating") {

      filtered.sort(
        (a, b) => (b.rating || 0) - (a.rating || 0)
      );

    }

    return filtered;

  }, [books, searchTerm, sortOption]);

  /* =====================================================
     UI STATES
  ===================================================== */

  if (loading) {
    return (
      <p className="text-center mt-5">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-center text-danger mt-5">
        {error}
      </p>
    );
  }

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <div className="container py-5">

      {/* =====================================================
          HERO SECTION
      ===================================================== */}

      <section className="mb-5">

        <h1
          className="mb-3 home-hero-title"
        >
          Discover Books That Upgrade Your Thinking
        </h1>

        <p
          className="text-muted home-hero-text"
        >
          Curated collection of productivity,
          mindset and career-changing books.
        </p>

      </section>

      {/* =====================================================
          SEARCH + SORT
      ===================================================== */}

      <section
        className="
          d-flex
          flex-column
          flex-md-row
          justify-content-between
          align-items-md-center
          gap-4
          mb-5
        "
      >

        <input
          type="text"
          className="form-control bn-input"
          placeholder="Search books..."
          value={searchTerm}
          onChange={(e) =>
            setSearchTerm(e.target.value)
          }
          style={{
            maxWidth: "380px"
          }}
        />

        <div
          className="
            d-flex
            align-items-center
            gap-3
            flex-wrap
          "
        >

          <span
            className="text-muted"
            style={{
              fontSize: "0.92rem"
            }}
          >
            Showing {filteredBooks.length} results
          </span>

          <select
            className="form-select"
            value={sortOption}
            onChange={(e) =>
              setSortOption(e.target.value)
            }
            style={{
              width: "200px",
              height: "48px",
              borderRadius: "var(--radius-md)"
            }}
          >
            <option value="popular">
              Sort: Popular
            </option>

            <option value="rating">
              Sort: Rating
            </option>

            <option value="low">
              Price: Low to High
            </option>

            <option value="high">
              Price: High to Low
            </option>

          </select>

        </div>

      </section>

      {/* =====================================================
          BOOK GRID
      ===================================================== */}

      {filteredBooks.length === 0 ? (

        <p className="text-center text-muted">
          No books found for "{searchTerm}"
        </p>

      ) : (

        <div className="row g-4">

          {filteredBooks.map((book) => (

            <div
              key={book._id}
              className="
                col-12
                col-sm-6
                col-lg-4
                col-xl-3
              "
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