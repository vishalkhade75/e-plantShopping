
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  // Convert a price such as "$15" into the number 15.
  const getPrice = (item) => {
    return Number(String(item.cost).replace(/[^0-9.]/g, '')) || 0;
  };

  // Calculate the total amount for all products in the cart.
  const calculateTotalAmount = () => {
    return cart.reduce(
      (total, item) => total + getPrice(item) * item.quantity,
      0
    ).toFixed(2);
  };

  // Return to the plant catalogue.
  const handleContinueShopping = (e) => {
    e.preventDefault();

    if (onContinueShopping) {
      onContinueShopping(e);
    }
  };

  // Increase the quantity of a product.
  const handleIncrement = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1,
      })
    );
  };

  // Decrease the quantity of a product.
  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(
        updateQuantity({
          id: item.id,
          quantity: item.quantity - 1,
        })
      );
    }
  };

  // Remove a product from the cart.
  const handleRemove = (item) => {
    dispatch(removeItem(item.id));
  };

  // Calculate the total cost for one product.
  const calculateTotalCost = (item) => {
    return (getPrice(item) * item.quantity).toFixed(2);
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>
        Total Cart Amount: ${calculateTotalAmount()}
      </h2>

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h3>Your shopping cart is empty.</h3>
          <p>Explore our plants and add your favourites to the cart!</p>
        </div>
      ) : (
        <div>
          {cart.map((item) => (
            <div className="cart-item" key={item.id}>
              <img
                className="cart-item-image"
                src={item.image}
                alt={item.name}
              />

              <div className="cart-item-details">
                <div className="cart-item-name">{item.name}</div>

                <div className="cart-item-cost">{item.cost}</div>

                <div className="cart-item-quantity">
                  <button
                    type="button"
                    className="cart-item-button cart-item-button-dec"
                    onClick={() => handleDecrement(item)}
                    disabled={item.quantity <= 1}
                    aria-label={`Decrease ${item.name} quantity`}
                  >
                    -
                  </button>

                  <span className="cart-item-quantity-value">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    className="cart-item-button cart-item-button-inc"
                    onClick={() => handleIncrement(item)}
                    aria-label={`Increase ${item.name} quantity`}
                  >
                    +
                  </button>
                </div>

                <div className="cart-item-total">
                  Total: ${calculateTotalCost(item)}
                </div>

                <button
                  type="button"
                  className="cart-item-delete"
                  onClick={() => handleRemove(item)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <div
        style={{ marginTop: '20px', color: 'black' }}
        className="total_cart_amount"
      />

      <div className="continue_shopping_btn">
        <button
          type="button"
          className="get-started-button"
          onClick={handleContinueShopping}
        >
          Continue Shopping
        </button>

        <br />

        <button
          type="button"
          className="get-started-button1"
          onClick={() => {
            if (cart.length > 0) {
              alert('Checkout functionality is not implemented yet.');
            }
          }}
          disabled={cart.length === 0}
        >
          Checkout
        </button>
      </div>
    </div>
  );
};

export default CartItem;
