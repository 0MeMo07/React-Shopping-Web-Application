import React from 'react';

import '../css/Cart.css'

export default function Cart() {
  return (
    <>

    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" />
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.bundle.min.js" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js" />
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css" />
      <div className="container mt-5 p-3 rounded cart">
        <div className="row no-gutters">
          <div className="col-md-8">
            <div className="product-details mr-2">
              <div className="d-flex flex-row align-items-center">
                <i className="fa fa-long-arrow-left"></i>
                <span className="ml-2">Continue Shopping</span>
              </div>
              <hr />
              <h6 className="mb-0">Shopping cart</h6>
              <div className="d-flex justify-content-between">
                <span>You have 4 items in your cart</span>
                <div className="d-flex flex-row align-items-center">
                  <span className="text-black-50">Sort by:</span>
                  <div className="price ml-2">
                    <span className="mr-1">price</span>
                    <i className="fa fa-angle-down"></i>
                  </div>
                </div>
              </div>

              {/* Repeat this block for each item in the cart */}
              <div className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                <div className="d-flex flex-row">
                  <img className="rounded" src="https://i.imgur.com/QRwjbm5.jpg" width="40" alt="Product" />
                  <div className="ml-2">
                    <span className="font-weight-bold d-block">Iphone 11 pro</span>
                    <span className="spec">256GB, Navy Blue</span>
                  </div>
                </div>
                <div className="d-flex flex-row align-items-center">
                  <span className="d-block">2</span>
                  <span className="d-block ml-5 font-weight-bold">$900</span>
                  <i className="fa fa-trash-o ml-3 text-black-50"></i>
                </div>
              </div>
              {/* Repeat block end */}

            </div>
          </div>
          <div className="col-md-4">
            <div className="payment-info">
              <div className="d-flex justify-content-between align-items-center">
                <span>Card details</span>
                <img className="rounded" src="https://i.imgur.com/WU501C8.jpg" width="30" alt="Card Type" />
              </div>

              {/* Repeat this block for each card type */}
              <label className="radio">
                <input type="radio" name="card" value="payment" checked />
                <span><img width="30" src="https://img.icons8.com/color/48/000000/mastercard.png" alt="Mastercard" /></span>
              </label>
              {/* Repeat block end */}

              <div>
                <label className="credit-card-label">Name on card</label>
                <input type="text" className="form-control credit-inputs" placeholder="Name" />
              </div>
              <div>
                <label className="credit-card-label">Card number</label>
                <input type="text" className="form-control credit-inputs" placeholder="0000 0000 0000 0000" />
              </div>
              <div className="row">
                <div className="col-md-6">
                  <label className="credit-card-label">Date</label>
                  <input type="text" className="form-control credit-inputs" placeholder="12/24" />
                </div>
                <div className="col-md-6">
                  <label className="credit-card-label">CVV</label>
                  <input type="text" className="form-control credit-inputs" placeholder="342" />
                </div>
              </div>
              <hr className="line" />
              <div className="d-flex justify-content-between information"><span>Subtotal</span><span>$3000.00</span></div>
              <div className="d-flex justify-content-between information"><span>Shipping</span><span>$20.00</span></div>
              <div className="d-flex justify-content-between information"><span>Total(Incl. taxes)</span><span>$3020.00</span></div>
              <button className="btn btn-primary btn-block d-flex justify-content-between mt-3" type="button">
                <span>$3020.00</span>
                <span>Checkout<i className="fa fa-long-arrow-right ml-1"></i></span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
