import logo from './logo.svg';
import './App.css';
import ProductList from './components/productList';
import Title from './components/title';
import ShoppingCart from './components/shoppingCart';

function App() {
  return (
    <div className='site'>
      <ShoppingCart></ShoppingCart>
      <Title></Title>
      <ProductList></ProductList>
    </div>
  );
}

export default App;
