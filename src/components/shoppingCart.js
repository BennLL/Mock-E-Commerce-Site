import React, { useState } from 'react';

const ShoppingCart = ({ cartItems }) => {
    const dummyCartItems = [
        { id: 1, title: 'Product 1', price: 10.99, quantity: 2 },
        { id: 2, title: 'Product 2', price: 19.99, quantity: 1 },
        { id: 3, title: 'Product 3', price: 5.99, quantity: 3 }
    ];
    const [open, setOpen] = useState(false);
    const toggleCart = () => {
        setOpen(!open);
    }
    return (
        <div className="cartIcon">
            <img src='https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png' onClick={toggleCart}></img>
            <div className = "cartList">{open && (
                <div>
                    <h3>Cart</h3>
                    <ul>
                        {dummyCartItems.length !== 0 ? dummyCartItems.map(item => (
                            <li key={item.id}>
                                <h3>{item.title}</h3>
                                <p>${parseFloat(item.price).toFixed(2)}</p>
                                <p>amount</p>
                            </li>
                        )) : null}
                    </ul>
                </div>
            )}
            </div>
        </div>
    );
}

export default ShoppingCart