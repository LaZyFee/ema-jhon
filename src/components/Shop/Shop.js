import React, { useEffect, useState } from 'react';
import Products from '../Product/Products';
import Cart from '../Carts/Cart';
import { addToDb, deleteShoppingCart, getStoredCart } from '../../utilities/fakedb';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRightLong } from '@fortawesome/free-solid-svg-icons';


const Shop = () => {

    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);
    const [cart, setCart] = useState([]);
    const [page, setPage] = useState(0);
    const [size, setSize] = useState(10);


    useEffect(() => {
        const url = `https://ema-jhon-server-delta.vercel.app/products?page=${page}&size=${size}`
        fetch(url)
            .then(res => res.json())
            .then(data => {
                setCount(data.count)
                setProducts(data.products)
            })
    }, [page, size])



    const pages = Math.ceil(count / size)


    const clearCart = () => {
        setCart([]);
        deleteShoppingCart();
    }

    useEffect(() => {
        const storedCart = getStoredCart();
        const savedCart = [];
        const ids = Object.keys(storedCart)
        fetch('https://ema-jhon-server-delta.vercel.app/productsByIds', {
            method: 'POST',
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify(ids)

        })
            .then(res => res.json())
            .then(data => {

                for (const id in storedCart) {
                    const addedProduct = data.find(product => product._id === id);
                    if (addedProduct) {
                        const quantity = storedCart[id];
                        addedProduct.quantity = quantity;
                        savedCart.push(addedProduct);
                    }
                }
                setCart(savedCart);
            })
    }, [products])
    const handleAddToCart = (selectedProduct) => {
        let newCart = [];
        const exists = cart.find(product => product._id === selectedProduct._id);
        if (!exists) {
            selectedProduct.quantity = 1;
            newCart = [...cart, selectedProduct];
        }
        else {
            const rest = cart.filter(product => product._id !== selectedProduct._id);
            exists.quantity = exists.quantity + 1;
            newCart = [...rest, exists];
        }
        /*const newCart = [...cart, selectedProduct];
        if (cart.length > 0) {
            const exist = cart.find(pd => pd._id === product._id);
            if (!exist) {
                newCart.push(product);
            }
        }
*/

        setCart(newCart);
        addToDb(selectedProduct._id)
    }

    return (
        <>
            {/* Select Dropdown */}
            <select
                className="select select-info md:max-w-[90%] max-w-[75%] mx-auto m-2 md:m-5"
                onChange={e => setSize(e.target.value)}
            >
                <option disabled selected>Show products per page</option>
                <option value='5'>5</option>
                <option value='10'>10</option>
                <option value='15'>15</option>
                <option value='20'>20</option>
            </select>

            {/* Products and Cart Section */}
            <div className="flex flex-col lg:flex-row gap-5 mx-5">
                {/* Products Section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 w-full lg:w-2/3">
                    {products.map(product => (
                        <Products
                            key={product._id}
                            product={product}
                            handleAddToCart={handleAddToCart}
                        />
                    ))}
                </div>

                {/* Cart Section */}
                <div className="w-full lg:w-1/3 shadow-2xl p-5 rounded-lg">
                    <Cart clearCart={clearCart} cart={cart}>
                        <Link to='/order'>
                            <button className='btn btn-outline btn-warning w-full mt-5'>
                                Review order <FontAwesomeIcon icon={faRightLong} />
                            </button>
                        </Link>
                    </Cart>
                </div>
            </div>

            {/* Pagination */}
            <div className="join flex flex-wrap gap-2 justify-center mx-auto my-5">
                {[...Array(pages).keys()].map(number => (
                    <input
                        key={number}
                        className="join-item btn btn-square md:mx-2 btn-sm md:btn-md"
                        type="radio"
                        name="options"
                        aria-label={number + 1}
                        onClick={() => setPage(number)}
                    />
                ))}
            </div>
        </>

    );
};

export default Shop;