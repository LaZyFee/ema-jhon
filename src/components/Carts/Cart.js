import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

const Cart = ({ cart, clearCart, children }) => {

    let price = 0;
    let shipping = 0;
    let quantity = 0;
    for (const product of cart) {
        quantity = quantity + product.quantity;
        price = price + product.price * product.quantity;
        shipping = shipping + product.shipping
    }
    const tax = parseFloat((price * 0.1).toFixed(2));
    const grandTotal = price + shipping + tax;



    return (
        <div className='sticky top-5'>
            <div className='text-left mx-3 mt-10'>
                <h1 className='text-3xl font-bold md:mb-10'>Order Summary</h1>
                <p className='text-xl md:mb-4'>Selected Items: {cart.length}</p>
                <p className='text-xl md:mb-4'>Total Quantity: {quantity}</p>
                <p className='text-xl md:mb-4'>Total Price: ${price} </p>
                <p className='text-xl md:mb-4'>Total Shipping Charge: ${shipping}</p>
                <p className='text-xl md:mb-4'>Tax: ${tax}</p>
                <p className='text-xl md:mb-4'>Grand Total: ${grandTotal}</p>

                <button onClick={clearCart} className='btn btn-outline btn-error w-full'>Clear Cart  <FontAwesomeIcon icon={faTrashCan} /></button>
                {children}
                <Link to='/shipping'><button className='btn btn-outline btn-warning w-full mt-5'> Proceed Shipping <FontAwesomeIcon icon={faRightLong} /></button></Link>
            </div>
        </div>

    );
};

export default Cart;