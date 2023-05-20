import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    axios.get(`cartitems/byId/2`).then((response) => {
      setCartItems(response.data);
    });
  }, [id]);

  return (
    <div>
      <h1>Cart Items</h1>
      <div className="cart-items">
        {cartItems.map((item) => (
          <div className="cart-item" key={item.id}>
            <h2>{item.id}</h2>
            <p>Description: {item.Buyer.name}</p>
            <p>Price: ${item.Buyer.email}</p>
            <p>Amount: {item.PaymentTypeId}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cart;