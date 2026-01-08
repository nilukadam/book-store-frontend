import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import books from "../data/books";
import Card from "../components/ui/Card";
import Button from "../components/ui/Button";

const BookDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const book = books.find((b) => b.id === id);

  if (!book) {
    return <div className="container mt-5">Book not found</div>;
  }

  const handleAddToCart = () => {
    addToCart(book);
    navigate("/cart")
  };

  const handleOrderNow = () => {
    addToCart(book);
    navigate("/cart");
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "720px" }}>
      <p className="text-muted mb-2" style={{ fontSize: "14px" }}>
        Home / Books / {book.title}
      </p>

      <Card className="p-4">
        {/* Book Cover */}
        <div className="text-center mb-3">
          <img
            src={book.cover}
            alt={book.title}
            className="img-fluid rounded"
            style={{ maxHeight: "380px", objectFit: "contain" }}
          />
        </div>

        {/* Book Info */}
        <h3 className="mb-1">{book.title}</h3>
        <p className="text-muted mb-2">— by {book.author}</p>
        <p className="mb-2">⭐ {book.rating} / 5</p>
        <p className="fs-4 fw-bold mb-3">₹{book.price}</p>

        <p className="text-secondary mb-4" style={{ lineHeight: "1.6" }}>
          {book.description}
        </p>

        <hr className="my-4" />

        {/* Actions */}
        <div className="d-flex gap-3">
          <Button onClick={handleAddToCart}>
            Add to Cart
          </Button>

          <Button variant="outline" onClick={handleOrderNow}>
            Order Now
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default BookDetails;
