import React, {
  useEffect,
  useState
} from "react";

import {
  useParams,
  useNavigate
} from "react-router-dom";

import { useCart } from "../context/CartContext";

import { formatCurrency } from "../utils/formatters";

import api from "../api/api";

import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import "../style/BookDetails.css";

const BookDetails = () => {

  /* =====================================================
     ROUTER + CONTEXT
  ===================================================== */

  const { id } = useParams();

  const navigate = useNavigate();

  const { addToCart } = useCart();

  /* =====================================================
     STATE
  ===================================================== */

  const [book, setBook] = useState(null);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* =====================================================
     FETCH BOOK
  ===================================================== */

  useEffect(() => {

    const fetchBook = async () => {

      try {

        const res = await api.get(`/products/${id}`);

        setBook(res.data);

      } catch (err) {

        setError("Failed to load book");

      } finally {

        setLoading(false);

      }

    };

    fetchBook();

  }, [id]);

  /* =====================================================
     UI STATES
  ===================================================== */

  if (loading) {
    return (
      <div className="container py-5">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="container py-5">
        {error}
      </div>
    );
  }

  if (!book) {
    return (
      <div className="container py-5">
        Book not found
      </div>
    );
  }

  /* =====================================================
     DERIVED VALUES
  ===================================================== */

  const hasDiscount =
    book.originalPrice &&
    book.originalPrice > book.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((book.originalPrice - book.price) /
          book.originalPrice) * 100
      )
    : null;

  const savings = hasDiscount
    ? book.originalPrice - book.price
    : null;

  /* =====================================================
     HANDLERS
  ===================================================== */

  const handlePurchase = () => {

    addToCart(book);

    navigate("/cart");

  };

  /* =====================================================
     MAIN UI
  ===================================================== */

  return (
    <div className="container py-5">

      <Card className="book-details-card">

        {/* =====================================================
            BOOK COVER
        ===================================================== */}

        <div className="book-image-wrapper">

          <img
            src={book.image}
            alt={book.title}
            className="book-image"
          />

        </div>

        {/* =====================================================
            CONTENT
        ===================================================== */}

        <div className="book-info">

          {/* TITLE */}

          <h1 className="book-title">
            {book.title}
          </h1>

          {/* AUTHOR */}

          <p className="book-author">
            — by {book.author}
          </p>

          {/* RATING */}

          <p className="book-rating">
            ⭐ {book.rating} / 5
          </p>

          {/* =====================================================
              PRICE
          ===================================================== */}

          <div className="book-price-section">

            <span className="book-price">
              {formatCurrency(book.price)}
            </span>

            {hasDiscount && (

              <div className="discount-info">

                <span className="original-price">
                  {formatCurrency(book.originalPrice)}
                </span>

                <span className="discount-percent">
                  {discountPercent}% Off
                </span>

              </div>

            )}

            {hasDiscount && (

              <p className="savings">
                You save {formatCurrency(savings)}
              </p>

            )}

          </div>

          {/* =====================================================
              HIGHLIGHTS
          ===================================================== */}

          <div className="book-highlights">

            {book.bestseller && (
              <span className="highlight-badge">
                Bestseller
              </span>
            )}

            <p>
              {book.format} · {book.language}
            </p>

            <p>
              {book.pages} Pages
            </p>

            <p>
              Delivery in 3-5 days
            </p>

            {book.stock > 0 ? (
              <p className="in-stock">
                In Stock
              </p>
            ) : (
              <p className="out-of-stock">
                Out of Stock
              </p>
            )}

          </div>

          <hr />

          {/* =====================================================
              ABOUT
          ===================================================== */}

          <h5 className="section-title">
            About this book
          </h5>

          <p className="book-description">
            {book.description}
          </p>

          <hr />

          {/* =====================================================
              PRODUCT DETAILS
          ===================================================== */}

          <h5 className="section-title">
            Product Details
          </h5>

          <div className="product-meta">

            <p>
              <strong>Publisher:</strong>
              {" "}
              {book.publisher}
            </p>

            <p>
              <strong>ISBN:</strong>
              {" "}
              {book.isbn}
            </p>

            <p>
              <strong>Language:</strong>
              {" "}
              {book.language}
            </p>

            <p>
              <strong>Pages:</strong>
              {" "}
              {book.pages}
            </p>

          </div>

          <hr />

          {/* =====================================================
              TRUST STRIP
          ===================================================== */}

          <ul className="trust-strip">

            <li>✔ Secure Payment</li>

            <li>✔ Fast Delivery</li>

            <li>✔ Easy Returns</li>

          </ul>

          {/* =====================================================
              ACTIONS
          ===================================================== */}

          <div className="book-actions">

            <Button onClick={handlePurchase}>
              Add to Cart
            </Button>

            <Button
              variant="outline-primary"
              onClick={handlePurchase}
            >
              Order Now
            </Button>

          </div>

        </div>

      </Card>

    </div>
  );

};

export default BookDetails;