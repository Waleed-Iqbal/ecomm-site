import React, { Component } from "react";
import { styled } from "styled-components";
import { Link } from 'react-router-dom';
import { ProductConsumer } from "../context";

export default class Product extends Component {
  render() {
    const { id, title, img, price, inCart } = this.props.product;
    return (
      <ProductWrapper class="col-9 mx-auto my-3 col-md-6 col-lg-3">
        <h3>Hello from Product</h3>
      </ProductWrapper>
    );
  }
}

const ProductWrapper = styled.div`
`