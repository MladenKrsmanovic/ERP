import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from 'react-router-dom';

function Details() {
    const [product, setProduct] = useState(null);
    const { id } = useParams();
  
    useEffect(() => {
      axios.get(`/products/byId/${id}`).then((response) => {
        setProduct(response.data);
      });
    }, [id]);
  
    if (!product) {
      return <div>Loading...</div>;
    }
  
    return (
      <div>
        <h1>{product.name}</h1>
        <img src={product.image} alt={product.name} />
        <div className="product-details">
         <p>Description:{product.description}</p>
         <p>Price: ${product.price}</p>
         <p>ManufacturingDate: {product.manufacturingDate}</p>
         <p>SerialNumber: {product.serialNumber}</p>

         <p>Product Type: {product.ProductType.name}</p>
         <p>Product Status: {product.ProductStatus.name}</p>
         <p>Manufacturer: {product.Manufacturer.name}</p>
        </div>
      </div>
    );
  }
  
  export default Details;