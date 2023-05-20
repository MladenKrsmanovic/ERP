import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";

function HomeBuyer() {
  const { id } = useParams();
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [buyerData, setBuyerData] = useState(null);
  const [showProfileForm, setShowProfileForm] = useState(false);

  useEffect(() => {
    fetchProducts();
    fetchBuyerData();
  }, [currentPage, searchQuery]);

  const fetchProducts = async () => {
    try {
      const response = await axios.get(
        `/products?keyword=${searchQuery}&page=${currentPage}&limit=10`
      );
      setProducts(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  const fetchBuyerData = async () => {
    try {
      const response = await axios.get(`/buyers/byId/${id}`);
      setBuyerData(response.data);
    } catch (error) {
      console.error("Error fetching buyer data:", error);
    }
  };

  const handleSearch = async () => {
    setCurrentPage(1);
    fetchProducts();
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handleProfileClick = () => {
    setShowProfileForm(!showProfileForm);
  };

  const handleDeleteAccount = async () => {
    try {
      await axios.delete(`/buyers/${id}`);
      // Redirect to the home page after deleting the account
      window.location.href = "/";
    } catch (error) {
      console.error("Error deleting account:", error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      // Check if a cart exists for the buyer
      const response = await axios.get(`/carts/byBuyerId/${id}`);
      let cartId;

      if (response.data) {
        // If a cart exists, use its cartId
        cartId = response.data.id;
      } else {
        // If a cart doesn't exist, create a new cart for the buyer
        const createCartResponse = await axios.post(`/carts`, {
          BuyerId: id,
          PaymentTypeId: 1,
        });
        cartId = createCartResponse.data.id;
      }

      // Add the product to the cart
      await axios.post(`/cartitems`, {
        amount: 1,
        CartId: cartId,
        ProductId: productId,
      });

      // Show a success message or perform any other necessary actions
      console.log("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart:", error);
    }
  };

  return (
    <div>
      <nav>
        <div className="logo">
          <a href="/">Logo</a>
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search Products..."
            value={searchQuery}
            onChange={handleInputChange}
          />
          <button type="button" onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className="login-cart">
          <Link to="/">
            <button type="button">Logout</button>
          </Link>
          <button type="button">Cart</button>
          <button type="button" onClick={handleProfileClick}>
            Profile
          </button>
        </div>
      </nav>

      {showProfileForm && buyerData && (
        <div className="profile-form">
          <button className="close-button" onClick={handleProfileClick}>
            X
          </button>
          <h2>Buyer Profile</h2>
          <p>Name: {buyerData.name}</p>
          <p>Surname: {buyerData.surname}</p>
          <p>Email: {buyerData.email}</p>
          <p>Is Admin: {buyerData.is_admin ? "Yes" : "No"}</p>
          <button onClick={handleDeleteAccount}>Delete Account</button>
        </div>
      )}

      <div className="products">
        {products.map((product) => (
          <div className="product" key={product.id}>
            <div className="product-image">
              <img src={product.image} alt={product.name} />
            </div>
            <div className="product-name">{product.name}</div>
            <div className="product-price">${product.price}</div>
            <div className="product-buttons">
              <Link to={`/products/${product.id}`}>
                <button type="button">Details</button>
              </Link>
              <button type="button" onClick={() => handleAddToCart(product.id)}>
                Add to cart
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="pagination">
        <button type="button" onClick={handlePreviousPage}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button type="button" onClick={handleNextPage}>
          Next
        </button>
      </div>
    </div>
  );
}

export default HomeBuyer;
