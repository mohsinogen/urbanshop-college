import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import Rating from "./Rating";
import { Fade } from "react-reveal";
import "./Product.css";

const Product = ({ product, match, history }) => {
  const [hover, setHover] = useState(false);

  return (
    <Card
      className="my-2 text-left card"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Link to={`/product/${product._id}`}>
        <Card.Img className="w-60" src={product.image} variant="top" />
      </Link>

      <Card.Body>
        <Link to={`/product/${product._id}`}>
          <Card.Title as="h6">
            <strong>{product.name}</strong>
          </Card.Title>
        </Link>

        <Card.Text>
          <strong as="h4">₹ {product.price}</strong>
          <Rating
            color="black"
            value={product.rating}
            text={`${product.numReviews} reviews`}
          />
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default Product;
