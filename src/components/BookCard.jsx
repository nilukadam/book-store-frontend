import React from "react";
import { useNavigate } from "react-router-dom";

import Card from "./ui/Card";
import Button from "./ui/Button";

import { formatCurrency } from "../utils/formatters";

import "./ui/bookCard.css";

const BookCard = ({ book }) => {
  /* -------------------- HOOKS -------------------- */
  const navigate = useNavigate();

  /* -------------------- SAFETY CHECK -------------------- */
  if (!book) return null;

  /* -------------------- HANDLERS -------------------- */
  const handleViewDetails = () => {
    navigate(`/book/${book.id}`);
  };

  /* -------------------- MAIN UI -------------------- */
  return (
    <Card className="book-card">
      <div className="book-card-image-wrapper">
        <img
          src={book.cover}
          alt={book.title}
          className="book-card-image"
        />
      </div>

      <div className="book-card-body">
        <h6 className="book-title">
          {book.title}
        </h6>

        <p className="book-author">
          {book.author}
        </p>

        <p className="book-rating">
          ⭐ {book.rating} / 5
        </p>

        <div className="book-card-footer">
          <span className="book-price">
            {formatCurrency(book.price)}
          </span>

          <Button
            size="sm"
            onClick={handleViewDetails}
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default BookCard;
