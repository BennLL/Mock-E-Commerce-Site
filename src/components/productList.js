import React, { useEffect, useState } from 'react';
import { fetchProducts } from './apiService';
import ProductDetail from './productDetail';

const ProductList = () => {
    const [products, setProducts] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedProduct, setSelectedProduct] = useState('');

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
    const filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchQuery.toLowerCase()));

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

    return (
        <div classname="productBox">
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
            {selectedProduct && <ProductDetail product={selectedProduct} onClose={closeDetail} />}
        </div>

    )
}

export default ProductList;