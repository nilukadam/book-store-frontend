import { useCart } from '../context/CartContext';
import { useOrders } from '../context/OrderContext';
import { useNavigate } from 'react-router-dom';

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

  // Orders context
   const { addOrder } = useOrders();
   const navigate = useNavigate();


  /*
    Calculate total cart amount dynamically.
    Recalculates automatically whenever cartItems change.
  */
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

// Handle order placement (frontend-only)
const handlePlaceOrder = () => {
  if (cartItems.length === 0) return;

  const newOrder = {
    id: `order_${Date.now()}`,   // unique order id
    items: cartItems,            // snapshot of cart items
    totalAmount,                 // already calculated above
    createdAt: new Date().toISOString()
  };

  // 1. Save order to order history
  addOrder(newOrder);

  // 2. Clear cart using existing logic
  cartItems.forEach(item => removeFromCart(item.id));

  // 3. Redirect user to Orders page
  navigate("/orders");
};


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
      <button className="btn btn-success w-100 mt-3"  disabled={cartItems.length === 0} onClick={handlePlaceOrder}>
        Place Order
      </button>

      {/*
        Display total cart amount
      */}
      <h3>Total: ₹{totalAmount}</h3>
    </div>
  );
};

export default Cart;
