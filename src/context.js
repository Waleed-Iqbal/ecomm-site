import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct
  };

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const product = { ...item };
      tempProducts = [...tempProducts, product];
    });
    this.setState(() => { return { products: tempProducts } })
  }

  componentDidMount() {
    this.setProducts();
  }

  getItem = (id) => {
    return this.state.products.find(product => product.id === id);
  }

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState(() => {
      return { detailProduct: product };
    });

  }

  addToCart = (id) => {
    console.log(`Added to cart. Id: ${id}`);
  }

  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetails: this.handleDetail,
        addToCart: this.addToCart
      }}>
        {this.props.children}
      </ProductContext.Provider>
    )
  }
}

const ProductConsumer = ProductContext.Consumer;

export {
  ProductProvider,
  ProductConsumer
}
