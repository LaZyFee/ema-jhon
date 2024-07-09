import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import React from 'react';

const Review = ({ product, handleRemoveItem }) => {
    const { name, price, quantity, img, shipping, id } = product;
    return (
        <div>
            <div className="card card-side card-bordered shadow-xl m-5 md:m-8 w-full md:w-4/5">
                <figure className=' md:w-1/2 lg:w-1/5'>
                    <img src={img} alt="Movie" />
                </figure>
                <div className="card-body">
                    <h2 className="card-title">{name}</h2>
                    <p>Price: ${price}</p>
                    <p>Quantity: {quantity}</p>
                    <p>Shipping Charge: ${shipping}</p>
                    <p>Total Price: ${price * quantity}</p>
                    <div className="justify-end card-actions">
                        <button onClick={() => handleRemoveItem(id)} className="btn btn-error btn-circle"><FontAwesomeIcon icon={faTrashCan} /> </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Review;