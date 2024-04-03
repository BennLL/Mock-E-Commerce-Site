import React from 'react';

const ShoppingCart = ({ cartItems, increaseQuantity, decreaseQuantity, removeFromCart }) => {
    const totalCost = cartItems.reduce((total, item) => {
        return total + item.product.price * item.quantity;
    }, 0);

    const decrease = (itemId) => {
        decreaseQuantity(itemId);
    };

    const increase = (itemId) => {
        increaseQuantity(itemId);
    };

    const remove = (itemId) => {
        removeFromCart(itemId);
    };

    return (
        <div className="cartList">
            <h3>Your Shopping Cart</h3>
            <p>Click again to close</p>

            {cartItems.length > 0 ? cartItems.map(item => (
                <div className="listItem" key={item.product.id}>
                    <img className="listItemImg" src={item.product.thumbnail} alt="Product Thumbnail" />
                    <div>
                        <h3>{item.product.title}</h3>
                        <p>Price: ${parseFloat(item.product.price).toFixed(2)}</p>
                        <p>Quantity: {item.quantity}</p>
                    </div>
                    <div>
                        <button onClick={() => decrease(item.product.id)}>-</button>
                        <span>{item.quantity}</span>
                        <button onClick={() => increase(item.product.id)}>+</button>
                        <button onClick={() => remove(item.product.id)}>Remove</button>
                    </div>
                </div>
            )) : <p>Your cart is empty</p>}
            
            {cartItems.length > 0 && (
                <div>
                    <h3>Before Tax: ${totalCost.toFixed(2)}</h3>
                    <h3>Tax: ${(totalCost * 0.1).toFixed(2)}</h3>
                    <h3>Total Cost: ${(totalCost * 1.1).toFixed(2)}</h3>
                    <button>Check Out</button>
                </div>
            )}
        </div>
    );
}

export default ShoppingCart;
