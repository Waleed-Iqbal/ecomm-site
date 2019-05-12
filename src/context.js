import React, { Component } from 'react'
import { storeProducts, detailProduct } from './data';

const ProductContext = React.createContext();

class ProductProvider extends Component {
  state = {
    products: [],
    detailProduct: detailProduct,
    cart: [],
    modalOpen: false,
    modalProduct: detailProduct,
    cartSubTotal: 0,
    cartTax: 0,
    cartTotal: 0
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
      products: allProducts,
      cart: [...this.state.cart, product]
    }, () => {
      this.addTotals();
    });
  }

  openModal = id => {
    const product = this.getItem(id);
    this.setState({ modalProduct: product, modalOpen: true });
  }

  closeModal = () => {
    this.setState({
      modalOpen: false
    });
  }

  increment = (id) => {
    console.log("increment");
  }

  decrement = (id) => {
    console.log("decrement");
  }

  removeItem = (id) => {
    console.log("remove from cart");
  }

  clearCart = () => {
    this.setState({ 
      cart: [] 
    }, () => {
      this.setProducts();
    });
  }

  addTotals = () => {
    let subTotal = 0;
    this.state.cart.map(item => (subTotal += item.total));
    const tempTax = subTotal * 0.16;
    const tax = parseFloat(tempTax.toFixed(2));
    const total = subTotal + tax;
    this.setState({
      cartSubTotal: subTotal,
      cartTax: tax,
      cartTotal: total
    });
  }

  render() {
    return (
      <ProductContext.Provider value={{
        ...this.state,
        handleDetail: this.handleDetail,
        addToCart: this.addToCart,
        openModal: this.openModal,
        closeModal: this.closeModal,
        increment: this.increment,
        decrement: this.decrement,
        removeItem: this.removeItem,
        clearCart: this.clearCart
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
