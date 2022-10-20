import React from 'react'
import { FaMinus, FaPlus } from 'react-icons/fa'

const CartAmountToggle = ({amount, setDecrease, setInscrease}) => {
  return (
    <div className='cart-button'>
      <div className="amount-toggle">
        <button onClick={() => setDecrease()}>
            <FaMinus/>
        </button>
        <div className="amount-style">{amount}</div>
        <button onClick={() => setInscrease()}>
            <FaPlus/>
        </button>
      </div>
    </div>
  )
}

export default CartAmountToggle
