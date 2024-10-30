import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const Review = ({ product, handleRemoveItem }) => {
    const { name, price, quantity, img, shipping, id } = product;
    return (
        <div className="card card-side card-bordered shadow-lg m-5 md:m-8 w-full md:w-4/5 flex-col md:flex-row gap-4">
            <figure className="md:w-1/2 p-4">
                <img src={img} alt={name} className="w-full" />
            </figure>
            <div className="card-body flex flex-col justify-center gap-2">
                <h2 className="card-title text-lg font-semibold">{name}</h2>
                <p className="text-gray-600">Price: <span className="font-medium">${price}</span></p>
                <p className="text-gray-600">Quantity: <span className="font-medium">{quantity}</span></p>
                <p className="text-gray-600">Shipping Charge: <span className="font-medium">${shipping}</span></p>
                <p className="text-red-500 font-bold">Total Price: ${price * quantity}</p>
                <div className="justify-end card-actions">
                    <button
                        onClick={() => handleRemoveItem(id)}
                        className="btn btn-error btn-circle hover:bg-red-600 transition duration-200"
                    >
                        <FontAwesomeIcon icon={faTrashCan} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Review;
