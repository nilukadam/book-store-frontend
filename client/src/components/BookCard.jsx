import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "./ui/Card";
import Button from "./ui/Button";

import { formatCurrency } from "../utils/formatters";

import "../style/bookCard.css";

const BookCard = ({ book }) => {
  const navigate = useNavigate();

  if (!book) return null;

  /* ---------- HANDLERS ---------- */
  const handleViewDetails = () => {
    navigate(`/book/${book._id}`);
  };

  const hasDiscount =
    book.originalPrice && book.originalPrice > book.price;

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

  /* ---------- MAIN UI ---------- */
  return (
    <Card className="book-card">
      <div className="book-card-image-wrapper">
        <img
          src={book.image}
          alt={book.title}
          className="book-card-image"
        />
      </div>

      <div className="book-card-body">
        <h6 className="book-title">
          {book.title}
        </h6>

        <p className="book-description">
          {book.description}
        </p>

        <p className="book-meta">
          {book.format} · {book.language}
        </p>

        <p className="book-author">
          {book.author}
        </p>

        <p className="book-rating">
          ⭐ {book.rating} / 5
        </p>

        <div className="book-price-section">
          <span className="book-price">
            {formatCurrency(book.price)}
          </span>

          {hasDiscount && (
            <div className="book-discount-info">
              <span className="original-price">
                {formatCurrency(book.originalPrice)}
              </span>
              <span className="discount-percent">
                {discountPercent}% Off
              </span>
            </div>
          )}

          {hasDiscount && (
            <p className="book-savings">
              You save {formatCurrency(savings)}
            </p>
          )}
        </div>

        <Button size="sm" onClick={handleViewDetails}>
          View Details
        </Button>
      </div>
    </Card>
  );
};

export default BookCard;