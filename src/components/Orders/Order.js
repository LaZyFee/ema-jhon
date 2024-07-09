import React, { useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import Cart from '../Carts/Cart';
import Review from '../Reviewitems/Review';
import { deleteShoppingCart, removeFromDb } from '../../utilities/fakedb';

const Order = () => {
    const { products, initialCart } = useLoaderData();
    const [cart, setCart] = useState(initialCart)

    const handleRemoveItem = (id) => {
        const remaining = cart.filter(product => product._id !== id);
        setCart(remaining);
        removeFromDb(id);
    }
    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }
    return (
        <div className='grid grid-cols-1 md:grid-cols-2'>
            <div>
                {
                    cart.map(product => <Review key={product._id} product={product}
                        handleRemoveItem={handleRemoveItem}></Review>)
                }
            </div>
            <div className='w-1/2 shadow-2xl'>
                <Cart clearCart={clearCart} cart={cart}>

                </Cart>
            </div>
        </div>
    );
};

export default Order;