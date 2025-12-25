import { useCart } from '../context/CartContext';

/*
  Cart page component.
  Responsibilities:
  - Display items added to the cart
  - Allow quantity updates (+ / −)
  - Allow item removal
  - Show total cart amount
*/
const Cart = () => {

  /*
    Extract cart state and actions from CartContext.
    This ensures all cart operations remain centralized.
  */
  const {
    cartItems,
    increaseQty,
    decreaseQty,
    removeFromCart
  } = useCart();

  /*
    Calculate total cart amount dynamically.
    Recalculates automatically whenever cartItems change.
  */
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /*
    Empty cart state.
    Shown when there are no items in the cart.
  */
  if (cartItems.length === 0) {
    return <h2>Your cart is empty.</h2>;
  }

  return (
    <div>
      <h2>Your Cart</h2>

      {/*
        Render list of cart items.
        Each item includes:
        - Book name
        - Price
        - Quantity controls
        - Remove option
      */}
      <ul>
        {cartItems.map(item => (
          <li key={item.id} style={{ marginBottom: '10px' }}>
            <strong>{item.name}</strong> — ₹{item.price} × {item.quantity}

            {/*
              Increase quantity button
            */}
            <button onClick={() => increaseQty(item.id)}> + </button>

            {/*
              Decrease quantity button
              If quantity becomes 0, item is removed automatically
            */}
            <button onClick={() => decreaseQty(item.id)}> − </button>

            {/*
              Remove item completely from cart
            */}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      {/*
        Display total cart amount
      */}
      <h3>Total: ₹{totalAmount}</h3>
    </div>
  );
};

export default Cart;
