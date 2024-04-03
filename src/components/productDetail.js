import React, { useState } from 'react';

const ProductDetail = ({ product, onClose }) => {
    const [amount, setAmount] = useState(1);

    const increment = () => {
        if (product.stock > amount) {
            setAmount(prevAmount => prevAmount + 1);
        }
    }

    const decrement = () => {
        if (amount > 1) { 
            setAmount(prevAmount => prevAmount - 1); 
        }

    }

    return (
        <div className="productDetail">
            <img className="productImg" src={product.thumbnail}></img>
            <div className='description'>
                <h2>{product.title}</h2>
                <p>Description: {product.description}</p>
                <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
                <p>Brand: {product.brand}</p>
                <p>Category: {product.category}</p>
                <p>Rating: {product.rating}/5.0</p>
                <p>Stock: {product.stock}</p>
                <div>
                    <button onClick={decrement}>-</button>
                    <span>{amount}</span>
                    <button onClick={increment}>+</button>
                    <button>Add to Cart</button>
                </div>
            </div>
            <button className="close" onClick={onClose}>Close</button>
        </div>
    )
}

export default ProductDetail