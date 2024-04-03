import React, { useEffect, useState } from 'react';
import { fetchProducts } from './apiService';
import ProductDetail from './productDetail';
import ShoppingCart from './shoppingCart';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');
    const [open, setOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const productsData = await fetchProducts();
                console.log(productsData);
                setProducts(productsData.products)
            } catch (e) {
                console.error(e);
            }
        };
        fetchData();
    }, []);

    //filter function
    const filteredProducts = products.filter(product => {
        const titleMatch = product.title.toLowerCase().includes(searchQuery.toLowerCase())
        const categoryMatch = product.category.toLowerCase().includes(searchQuery.toLowerCase());
        return titleMatch || categoryMatch;
    });

    const handleSearch = (event) => {
        setSearchQuery(event.target.value);
    }

    //product detail
    const openDetail = (product) => {
        setSelectedProduct(product);
    }

    const closeDetail = () => {
        setSelectedProduct(null);
    }

    //cart
    const toggleCart = () => {
        setOpen(!open);
    }

    const addToCart = (product, quantity) => {
        const existingItem = cartItems.find(item => item.product.id === product.id);
        if (existingItem) {
            setCartItems(prevItems => prevItems.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + quantity } : item));
        } else {
            setCartItems(prevItems => [...prevItems, { product, quantity }]);
        }
    }

    const increaseQuantity = (productId) => {
        setCartItems(prevCartItems => {
            return prevCartItems.map(item => {
                if (item.product.id === productId && item.quantity < item.product.stock) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            })
        })
    };

    const decreaseQuantity = (productId) => {
        setCartItems(prevCartItems => {
            return prevCartItems.map(item => {
                if (item.product.id === productId && item.quantity > 1) {
                    return { ...item, quantity: item.quantity - 1 };
                }
                return item;
            });
        });
    };

    const removeFromCart = (productId) => {
        setCartItems(prevCartItems => {
            return prevCartItems.filter(item => item.product.id !== productId)
        })
    };


    return (
        <div className="productBox">
            <div className="cartIcon">
                <img src='https://static.vecteezy.com/system/resources/previews/019/787/018/original/shopping-cart-icon-shopping-basket-on-transparent-background-free-png.png' onClick={toggleCart}></img>
                {open && <ShoppingCart cartItems={cartItems}
                    increaseQuantity={increaseQuantity}
                    decreaseQuantity={decreaseQuantity}
                    removeFromCart={removeFromCart}
                />}
            </div>
            <input
                className="searchBar" placeholder='⌕ Search up an item' type='text'
                value={searchQuery}
                onChange={handleSearch}
            ></input>
            <div class="productList">
                {filteredProducts.map(product => (
                    <div className="productItem" key={product.id} onClick={() => openDetail(product)}>
                        <img className="productImg" src={product.thumbnail}></img>
                        <div>
                            <h3>{product.title}</h3>
                            <p>Price: ${parseFloat(product.price).toFixed(2)}</p>
                            <p>Rating: {product.rating}</p>
                            <p>{product.stock} Remaining!</p>
                        </div>
                    </div>
                ))}
            </div>
            {selectedProduct && <ProductDetail product={selectedProduct} onClose={closeDetail} addToCart={addToCart} />}
        </div>

    )
}

export default ProductList;