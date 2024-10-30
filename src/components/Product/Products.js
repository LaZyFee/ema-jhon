import React from 'react';

const Products = ({ handleAddToCart, product }) => {
    const { name, price, img, seller, ratings } = product;
    return (
        <div className="card bg-base-100 shadow-xl">
            <figure className="h-full w-full bg-gray-200 flex items-center justify-center overflow-hidden">
                <img
                    src={img || "https://via.placeholder.com/150"}
                    alt={name || "Placeholder Image"}
                />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{name}</h2>
                <p>Price: ${price}</p>
                <p className="text-[#2A414F]">Manufacturer: {seller}</p>
                <p className="text-[#2A414F]">Ratings: {ratings} star</p>
                <div className="card-actions justify-end">
                    <button className="btn btn-outline btn-warning" onClick={() => handleAddToCart(product)}>Add to Cart</button>
                </div>
            </div>
        </div>

    );
};

export default Products;

