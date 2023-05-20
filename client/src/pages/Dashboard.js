import React, { useState, useEffect } from "react";
import axios from "axios";

const Dashboard = () => {
  const [products, setProducts] = useState([]);
  const [buyers, setBuyers] = useState([]);
  const [manufacturers, setManufacturers] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [cartItems, setCartItems] = useState([]);
  const [showProductsTable, setShowProductsTable] = useState(false);
  const [showBuyersTable, setShowBuyersTable] = useState(false);
  const [showManufacturersTable, setShowManufacturersTable] = useState(false);
  const [showTransactionsTable, setShowTransactionsTable] = useState(false);
  const [showCartItemsTable, setShowCartItemsTable] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchBuyers();
    fetchManufacturers();
    fetchTransactions();
    fetchCartItems();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("/products");
      setProducts(response.data.products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchBuyers = async () => {
    try {
      const response = await axios.get("/buyers");
      setBuyers(response.data);
    } catch (error) {
      console.error("Error fetching buyers:", error);
    }
  };

  const fetchManufacturers = async () => {
    try {
      const response = await axios.get("/manufacturers");
      setManufacturers(response.data);
    } catch (error) {
      console.error("Error fetching manufacturers:", error);
    }
  };

  const fetchTransactions = async () => {
    try {
      const response = await axios.get("/transactions");
      setTransactions(response.data);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  const fetchCartItems = async () => {
    try {
      const response = await axios.get("/cartitems");
      setCartItems(response.data);
    } catch (error) {
      console.error("Error fetching cart items:", error);
    }
  };

  const toggleProductsTable = () => {
    setShowProductsTable(!showProductsTable);
  };

  const toggleBuyersTable = () => {
    setShowBuyersTable(!showBuyersTable);
  };

  const toggleManufacturersTable = () => {
    setShowManufacturersTable(!showManufacturersTable);
  };

  const toggleTransactionsTable = () => {
    setShowTransactionsTable(!showTransactionsTable);
  };

  const toggleCartItemsTable = () => {
    setShowCartItemsTable(!showCartItemsTable);
  };

  return (
    <div className="dashboard">
      <h1>Product Dashboard</h1>
      <div>
        <button onClick={toggleProductsTable}>Products</button>
        <button onClick={toggleBuyersTable}>Buyers</button>
        <button onClick={toggleManufacturersTable}>Manufacturers</button>
        <button onClick={toggleTransactionsTable}>Transactions</button>
        <button onClick={toggleCartItemsTable}>CartItems</button>
      </div>
      {showProductsTable && (
        <div>
          <h2>Products</h2>
          <table className="product-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Description</th>
                <th>Price</th>
                <th>Manufacturing Date</th>
                <th>Serial Number</th>
                <th>Image</th>
                <th>Manufacturer ID</th>
                <th>Product Status ID</th>
                <th>Product Type ID</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.id}</td>
                  <td>{product.name}</td>
                  <td>{product.description}</td>
                  <td>{product.price}</td>
                  <td>{product.manufacturingDate}</td>
                  <td>{product.serialNumber}</td>
                  <td>{product.image}</td>
                  <td>{product.ManufacturerId}</td>
                  <td>{product.ProductStatusId}</td>
                  <td>{product.ProductTypeId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showBuyersTable && (
        <div>
          <h2>Buyers</h2>
          <table className="buyer-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Surname</th>
                <th>Email</th>
                <th>Password</th>
                <th>Is Admin</th>
              </tr>
            </thead>
            <tbody>
              {buyers.map((buyer) => (
                <tr key={buyer.id}>
                  <td>{buyer.id}</td>
                  <td>{buyer.name}</td>
                  <td>{buyer.surname}</td>
                  <td>{buyer.email}</td>
                  <td>{buyer.password}</td>
                  <td>{buyer.is_admin ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showManufacturersTable && (
        <div>
          <h2>Manufacturers</h2>
          <table className="manufacturer-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
              </tr>
            </thead>
            <tbody>
              {manufacturers.map((manufacturer) => (
                <tr key={manufacturer.id}>
                  <td>{manufacturer.id}</td>
                  <td>{manufacturer.name}</td>
                  <td>{manufacturer.email}</td>
                  <td>{manufacturer.phone}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showTransactionsTable && (
        <div>
          <h2>Transactions</h2>
          <table className="transaction-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Transaction Date</th>
                <th>Payment Processor</th>
                <th>Currency</th>
                <th>Cart ID</th>
                <th>Transaction Status ID</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map((transaction) => (
                <tr key={transaction.id}>
                  <td>{transaction.id}</td>
                  <td>{transaction.transactionDate}</td>
                  <td>{transaction.paymentProcessor}</td>
                  <td>{transaction.currency}</td>
                  <td>{transaction.CartId}</td>
                  <td>{transaction.TransactionStatusId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {showCartItemsTable && (
        <div>
          <h2>Cart Items</h2>
          <table className="cart-item-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Amount</th>
                <th>Cart ID</th>
                <th>Product ID</th>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.amount}</td>
                  <td>{item.CartId}</td>
                  <td>{item.ProductId}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Dashboard;



