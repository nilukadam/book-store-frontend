import { useState } from 'react';
import booksData from '../data/books';
import { useCart } from '../context/CartContext';

/*
  Home page component.
  Responsibilities:
  - Display list of available books
  - Handle client-side search
  - Allow users to add books to cart
*/
const Home = () => {

  /*
    searchTerm stores the value entered in the search input.
    It is used to filter books in real time on the client side.
  */
  const [searchTerm, setSearchTerm] = useState('');

  /*
    Filter books based on search term.
    - Case-insensitive search
    - Runs on every render when searchTerm changes
  */
  const filteredBooks = booksData.filter((book) =>
    book.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /*
    Extract addToCart function from CartContext.
    This allows Home page to update centralized cart state.
  */
  const { addToCart } = useCart();

  return (
    /*
      Main container for Home page content.
      marginTop is used to avoid overlap with fixed header.
    */
    <div style={{ padding: '20px', marginTop: '80px' }}>
      
      <h2>Available Books</h2>

      {/*
        Search input for filtering books by name.
        Updates searchTerm state on every keystroke.
      */}
      <input
        type="text"
        placeholder="Search books..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ padding: '6px', marginBottom: '20px' }}
      />

      {/*
        Conditional rendering:
        - Show message if no books match search
        - Otherwise, display filtered book list
      */}
      {filteredBooks.length === 0 ? (
        <p>No books found.</p>
      ) : (
        <ul>
          {filteredBooks.map((book) => (
            <li key={book.id} style={{ marginBottom: '10px' }}>
              <strong>{book.name}</strong> — ₹{book.price}

              {/*
                Add to Cart button.
                On click, sends selected book to CartContext.
              */}
              <button onClick={() => addToCart(book)}>
                Add to Cart
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Home;
