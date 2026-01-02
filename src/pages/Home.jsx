import { useState } from "react";
import booksData from "../data/books";
import { useCart } from "../context/CartContext";
import Button from "../components/ui/Button";

const Home = () => {
  // store search input value
  const [searchTerm, setSearchTerm] = useState("");

  // get addToCart function from cart context
  const { addToCart } = useCart();

  // filter books based on search input (case insensitive)
  const filteredBooks = booksData.filter((book) =>
    book.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Available Books</h2>

      {/* search input */}
      <input
        type="text"
        className="form-control mb-4"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />

      {/* show message if no books found */}
      {filteredBooks.length === 0 ? (
        <p className="text-center text-muted">
          No books found for "{searchTerm}"
        </p>
      ) : (
        <ul className="list-group">
          {filteredBooks.map((book) => (
            <li
              key={book.id}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              <div>
                <strong>{book.title}</strong>
                <div className="text-muted">₹{book.price}</div>
              </div>

              <button
                className="btn btn-primary btn-sm"
                onClick={() => addToCart(book)}
              >
                Add to Cart
              </button>

              {/* UI Button tests (safe to keep) */}
              <Button>Test Button</Button>
              <Button variant="secondary" className="ms-2">
                Secondary
              </Button>
              <Button variant="danger" disabled className="ms-2">
                Disabled
              </Button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
