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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-4 ">
            <div className="col-span-2 space-y-4">
                {cart.length ? (
                    cart.map(product => (
                        <Review
                            key={product._id}
                            product={product}
                            handleRemoveItem={handleRemoveItem}
                        />
                    ))
                ) : (
                    <p className="text-center text-gray-500 font-medium mt-4">
                        Your cart is empty. Start shopping now!
                    </p>
                )}
            </div>
            <div className="shadow-lg border rounded-lg p-4 sticky top-4 h-max">
                <Cart clearCart={clearCart} cart={cart} />
            </div>
        </div>
    );
};

export default Order;
