import Card from "./ui/Card";
import Button from "./ui/Button";
import "./ui/bookCard.css";

const BookCard = ({ book }) => {
  if (!book) return null; // safety guard

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
        <h6 className="book-title">{book.title}</h6>
        <p className="book-author">{book.author}</p>

        <p className="book-rating">
          ⭐ {book.rating} / 5
        </p>

        <div className="book-card-footer">
          <span className="book-price">₹{book.price}</span>
          <Button size="sm">View Details</Button>
        </div>
      </div>
    </Card>
  );
};

export default BookCard;
