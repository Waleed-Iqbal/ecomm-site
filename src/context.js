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
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count += 1;
    product.total = product.count * product.price;
    this.setState({
      cart: [...tempCart]
    }, () => {
      this.addTotals();
    });
  }

  decrement = (id) => {
    let tempCart = [...this.state.cart];
    const selectedProduct = tempCart.find(item => item.id === id);
    const index = tempCart.indexOf(selectedProduct);
    const product = tempCart[index];
    product.count -= 1;
    if (product.count < 0) {
      product.count = 0;
    } else {

      product.total = product.count * product.price;
      this.setState({
        cart: [...tempCart]
      }, () => {
        this.addTotals();
      });
    }
  }

  removeItem = (id) => {
    let tempProducts = [...this.state.products];
    let tempCart = [...this.state.cart];
    tempCart = tempCart.filter(item => item.id !== id);
    const index = tempProducts.indexOf(this.getItem(id));
    let removedProduct = tempProducts[index];
    removedProduct.inCart = false;
    removedProduct.count = 0;
    removedProduct.total = 0;

    this.setState({
      cart: [...tempCart],
      products: [...tempProducts]

    }, () => {
      this.addTotals();
    });

  }

  clearCart = () => {
    this.setState({
      cart: []
    }, () => {
      this.setProducts();
      this.addTotals();
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
