import {Component} from 'react'
import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'

import LoginForm from './components/LoginForm'
import Home from './components/Home'
import Products from './components/Products'
import ProductItemDetails from './components/ProductItemDetails'
import Cart from './components/Cart'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import CartContext from './context/CartContext'
import OrderSuccess from './components/OrderSuccess'

import './App.css'

class App extends Component {
  state = {
    cartList: [],
  }

  addCartItem = product => {
    const {cartList} = this.state
    const present = cartList.some(each => each.id === product.id)
    if (present) {
      const {quantity} = product
      const newquant = quantity
      console.log(newquant)
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id !== product.id) {
            return each
          }
          console.log(each.quantity + newquant)

          return {...each, quantity: each.quantity + newquant}
        }),
      }))
    } else {
      this.setState(prevState => ({cartList: [...prevState.cartList, product]}))
    }
  }

  deleteCartItem = id => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(each => each.id !== id),
    }))
  }

  removeAllCartItems = () => {
    this.setState({cartList: []})
  }

  incrementCartItemQuantity = data => {
    const {newQuantity, id} = data
    console.log(data)
    this.setState(prevState => ({
      cartList: prevState.cartList.map(each => {
        if (each.id !== id) {
          return each
        }

        return {...each, quantity: newQuantity}
      }),
    }))
  }

  decrementCartItemQuantity = data => {
    const {id} = data
    const {cartList} = this.state
    const productObject = cartList.find(eachCartItem => eachCartItem.id === id)
    if (productObject.quantity > 1) {
      this.setState(prevState => ({
        cartList: prevState.cartList.map(each => {
          if (each.id !== id) {
            return each
          }

          return {...each, quantity: each.quantity - 1}
        }),
      }))
    } else {
      this.deleteCartItem(id)
    }
  }

  render() {
    const {cartList} = this.state
    console.log(cartList)

    return (
      <BrowserRouter>
        <CartContext.Provider
          value={{
            cartList,
            addCartItem: this.addCartItem,
            deleteCartItem: this.deleteCartItem,
            removeCartItem: this.removeCartItem,
            incrementCartItemQuantity: this.incrementCartItemQuantity,
            decrementCartItemQuantity: this.decrementCartItemQuantity,
            removeAllCartItems: this.removeAllCartItems,
          }}
        >
          <Switch>
            <Route exact path="/login" component={LoginForm} />
            <ProtectedRoute exact path="/" component={Home} />
            <ProtectedRoute exact path="/products" component={Products} />
            <ProtectedRoute
              exact
              path="/products/:id"
              component={ProductItemDetails}
            />
            <ProtectedRoute exact path="/cart" component={Cart} />
            <ProtectedRoute exact path="/successful" component={OrderSuccess} />
            <Route path="/not-found" component={NotFound} />
            <Redirect to="not-found" />
          </Switch>
        </CartContext.Provider>
      </BrowserRouter>
    )
  }
}

export default App
