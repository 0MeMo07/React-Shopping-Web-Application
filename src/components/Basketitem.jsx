import React from 'react'

function BasketItem({ item, product }) {
  return (
    <div>
        {product.title} x {item.amount}
    </div>
  )
}

export default BasketItem