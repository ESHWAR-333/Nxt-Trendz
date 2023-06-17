import {withRouter} from 'react-router-dom'
import CartContext from '../../context/CartContext'

import './index.css'

const CartSummary = props => (
  <CartContext.Consumer>
    {value => {
      const {cartList} = value
      const numberOfItems = cartList.length
      let sum = 0
      cartList.forEach(each => {
        sum += each.quantity * each.price
      })

      const DisplaySuccessfulPlacedOrder = () => {
        console.log(props)
        const {history} = props
        history.replace('/successful')
      }
      return (
        <div className="cart-summary-container">
          <h1 className="cart-summary-heading">
            Order Total: <span className="total-sum">Rs {sum}/- </span>
          </h1>
          <p className="cart-summary-description">
            {numberOfItems} Items in cart
          </p>
          <button
            type="button"
            className="cart-summary-button"
            onClick={DisplaySuccessfulPlacedOrder}
          >
            Checkout
          </button>
        </div>
      )
    }}
  </CartContext.Consumer>
)

export default withRouter(CartSummary)
