import React, { Component } from 'react'
import {storeProducts, detailProduct} from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct
  };

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const product = {...item};
      tempProducts = [...tempProducts, product];
    });
    this.setState(()=>{return {products:tempProducts}})
  }

  componentDidMount() {
    this.setProducts();
  }


  handleDetail = () => {
    console.log("hello from detail");
  }

  addToCart = () => {
    console.log("hello from add to card");
  }

  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetails: this.handleDetail,
        addToCart: this.addToCart
      }}>
        { this.props.children }
      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer;

export {
  ProductProvider,
  ProductConsumer
}
