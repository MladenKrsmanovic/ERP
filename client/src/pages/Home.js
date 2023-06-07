import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

function Home() {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchProducts();
  }, [currentPage,searchQuery]);

  //ako uklonim searchQuery od gore iz uglasith zagrada onda cu moci da dobijem pretragu samo kad kliknem na dugme Search

  const fetchProducts = async () => {
    const response = await axios.get(
      `/products?keyword=${searchQuery}&page=${currentPage}&limit=10`
    );
    setProducts(response.data.products);
    setTotalPages(response.data.totalPages);
  };

  const handleSearch = async () => {
    setCurrentPage(1); // Reset current page to 1 when performing a new search
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
         <Link to="/login"> 
           <button type="button">Login</button>
         </Link>
         <Link to="/login">
           <button type="button">Cart</button>
           </Link>
          
        </div>
      </nav>
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
              <Link to="/login">
              <button type="button">Add to cart</button>
              </Link>
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

export default Home;