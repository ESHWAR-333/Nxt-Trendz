import {Link} from 'react-router-dom'
import Header from '../Header'

import './index.css'

const OrderSuccess = () => (
  <>
    <Header />
    <div className="successful-place-order-container">
      <div className="successful-place-order-content-container">
        <img
          src="https://img.freepik.com/free-vector/no-time-concept-illustration_114360-4209.jpg"
          alt="successful-order"
          className="successful-order-image"
        />
        <h1 className="successful-order-heading">
          Your order has been successfully placed
        </h1>
        <Link to="/products">
          <button type="button" className="shop-now-btn">
            Continue Shopping
          </button>
        </Link>
      </div>
    </div>
  </>
)
export default OrderSuccess
