import React, { Component } from "react";
import styled from "styled-components";
import { Link } from 'react-router-dom';
import { ProductConsumer } from "../context";

export default class Product extends Component {
  render() {
    const { id, title, img, price, inCart } = this.props.product;
    return (
      <ProductWrapper className="col-9 mx-auto my-3 col-md-6 col-lg-3">
        <div className="card">
          <div className="img-container p-5" onClick={() => { console.log("clicked"); }} >
            <Link to="/details">
              <img src={img} alt="product" className="card-img-top" />
            </Link>
            <button className="cart-btn" disabled={inCart ? true : false} onClick={() => { console.log('added to cart'); }}>
              {
                inCart
                  ?
                  <p className="text-capitalize mb-0" disabled>in Cart</p>
                  :
                  <i className="fa fa-cart-plus"></i>
              }
            </button>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <p className="align-self-center mb-0">{title}</p>
            <h5 className="text-blue font-italic mb-0">
              <span className="mr-1">$</span>
              {price}
            </h5>
          </div>
        </div>
      </ProductWrapper>
    );
  }
}

const ProductWrapper = styled.div`
.card {
  border: transparent;
  transition: all 0.3s linear;
}
.card-footer {
  background: transparent;
  border-top: transparent;
  transition: all 0.3s linear;
}
&:hover {
  .card {
    border: 0.04rem solid rgba(0, 0, 0, 0.2);
    box-shadow: 2px 2px 5px 0 rgba(0, 0, 0, 0.2);
  }
  .card-footer {
    background-color: rgba(247, 247, 247);
  }
}
  .img-container {
    position: relative;
    overflow: hidden;
  }

  .card-img-top {
    transition: transform 0.3s linear;
  }

  .img-container:hover .card-img-top {
    transform: scale(1.15);
  }

  .cart-btn {
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 0.2rem 0.4rem;
    background: var(--lightBlue);
    border: none;
    color: var(--mainWhite);
  } 
}
`;