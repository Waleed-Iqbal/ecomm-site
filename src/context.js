import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: []
  };

  setProducts = () => {
    let tempProducts = [];
    storeProducts.forEach(item => {
      const product = { ...item };
      tempProducts = [...tempProducts, product];
    });
    this.setState({ products: tempProducts });
  }

  componentDidMount() {
    this.setProducts();
  }

  getItem = (id) => {
    return this.state.products.find(product => product.id === id);
  }

  handleDetail = (id) => {
    const product = this.getItem(id);
    this.setState({ detailProduct: product });
  }

  addToCart = (id) => {
    let allProducts = [...this.state.products];
    const index = allProducts.indexOf(this.getItem(id));
    const product = allProducts[index];
    product.inCart = true;
    product.count = 1;
    const price = product.price;
    product.total = price;
    this.setState({
      products:allProducts, 
      cart: [...this.state.cart, product]
    }, () => {
      console.log(this.state);
    });
  }

  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail: this.handleDetail,
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
