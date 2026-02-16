import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatters";

import books from "../data/books";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import "../style/BookDetails.css";

const BookDetails = () => {
  /* -------------------- ROUTING -------------------- */
  const { id } = useParams();
  const navigate = useNavigate();

  /* -------------------- CART -------------------- */
  const { addToCart } = useCart();

  /* -------------------- DATA -------------------- */
  const book = books.find((b) => b.id === id);

  if (!book) {
    return (
      <div className="container mt-5">
        Book not found
      </div>
    );
  }

  const hasDiscount =
    book.originalPrice &&
    book.originalPrice > book.price;

  const discountPercent = hasDiscount
    ? Math.round(
        ((book.originalPrice - book.price) /
          book.originalPrice) *
          100
      )
    : null;

  const savings = hasDiscount
    ? book.originalPrice - book.price
    : null;

  /* -------------------- HANDLERS -------------------- */
  const handlePurchase = () => {
    addToCart(book);
    navigate("/cart");
  };

  /* -------------------- UI -------------------- */
  return (
    <div className="container book-details-container">
      <Card className="book-details-card">

        {/* Cover */}
        <div className="book-image-wrapper">
          <img
            src={book.cover}
            alt={book.title}
            className="book-image"
          />
        </div>

        {/* Content */}
        <div className="book-info">

          {/* Title & Basic Info */}
          <h1 className="book-title">
            {book.title}
          </h1>

          <p className="book-author">
            — by {book.author}
          </p>

          <p className="book-rating">
            ⭐ {book.rating} / 5
          </p>

          {/* Price Section */}
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

          {/* Highlights */}
          <div className="book-highlights">
            {book.bestseller && (
              <span className="highlight-badge">
                Bestseller
              </span>
            )}

            <p>{book.format} · {book.language}</p>
            <p>{book.pages} Pages</p>
            <p>Delivery in {book.deliveryDays} days</p>

            {book.inStock ? (
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

          {/* About Section */}
          <h5 className="section-title">
            About this book
          </h5>

          <p className="book-description">
            {book.description}
          </p>

          <hr />

          {/* Product Meta */}
          <h5 className="section-title">
            Product Details
          </h5>

          <div className="product-meta">
            <p><strong>Publisher:</strong> {book.publisher}</p>
            <p><strong>ISBN:</strong> {book.isbn}</p>
            <p><strong>Language:</strong> {book.language}</p>
            <p><strong>Pages:</strong> {book.pages}</p>
          </div>

          <hr />

          {/* Trust Section */}
          <ul className="trust-strip">
            <li>✔ Secure Payment</li>
            <li>✔ Fast Delivery</li>
            <li>✔ Easy Returns</li>
          </ul>

          {/* Actions */}
          <div className="book-actions">
            <Button onClick={handlePurchase}>
              Add to Cart
            </Button>

            <Button
              variant="outline"
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
