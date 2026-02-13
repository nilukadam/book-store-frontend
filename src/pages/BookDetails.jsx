import React from "react";
import { useParams, useNavigate } from "react-router-dom";

import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/formatters";

import books from "../data/books";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

import "../style/BookDetails.css";

const BookDetails = () => {
  /* -------------------- HOOKS -------------------- */
  const { id } = useParams();
  const navigate = useNavigate();
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

  /* -------------------- HANDLERS -------------------- */
  const handlePurchase = () => {
    addToCart(book);
    navigate("/cart");
  };

  /* -------------------- MAIN UI -------------------- */
  return (
    <div className="container mt-5 book-details-container">
      <Card className="book-details-card">
        {/* Book Cover */}
        <div className="book-image-wrapper">
          <img
            src={book.cover}
            alt={book.title}
            className="book-image"
          />
        </div>

        {/* Book Info */}
        <div className="book-info">
          <h3 className="book-title size-30px">
            {book.title}
          </h3>

          <p className="book-author">
            — by {book.author}
          </p>

          <p className="book-rating">
            ⭐ {book.rating} / 5
          </p>

          <p className="book-price">
            {formatCurrency(book.price)}
          </p>

          <p className="book-description">
            {book.description}
          </p>

          <hr />

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
