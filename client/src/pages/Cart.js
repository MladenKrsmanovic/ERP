import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


function Cart() {
  const { id } = useParams();
  const [cart, setCart] = useState(null);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const response = await axios.get(`/carts/byBuyerId/${id}`);
      if (response.data) {
        const cartId = response.data.id;
        setCart(response.data);
        const cartItemsResponse = await axios.get(`/cartItems/byCartId/${cartId}`);
        const cartItemsWithProduct = await Promise.all(
          cartItemsResponse.data.map(async (cartItem) => {
            const productResponse = await axios.get(`/products/byId/${cartItem.ProductId}`);
            const product = productResponse.data;
            return {
              ...cartItem,
              product: product,
            };
          })
        );
        setCartItems(cartItemsWithProduct);
      } else {
        setCart(null);
        setCartItems([]);
      }
    } catch (error) {
      console.error("Error fetching cart:", error);
    }
  };

  const handleCheckout = async () => {
    try {
      const response = await axios.post("/str/create-checkout-session", {
        cart,
        cartItems,
      });
      if (response.data.url) {
        window.location.href = response.data.url;
      } else {
        console.error("Failed to create checkout session:", response.data);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  return (
    <div className="cart-container">
      {cart && (
        <div className="cart">
          <h2>Cart</h2>
          
         
          {cartItems.map((cartItem) => (
            <div key={cartItem.id} className="cart-item">
              
              <p>Product Name: {cartItem.product.name}</p>
              <p>Product Price: {cartItem.product.price}</p>
              <p>Quantity: {cartItem.amount}</p>
            </div>
          ))}
          <button className="checkout-button" onClick={handleCheckout}>
            Checkout
          </button>
        </div>
      )}
      {!cart && <p>No cart found.</p>}
    </div>
  );
}

export default Cart;