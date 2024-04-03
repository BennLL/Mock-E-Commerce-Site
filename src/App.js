import logo from './logo.svg';
import './App.css';
import ProductList from './components/productList';
import Title from './components/title';

function App() {
  return (
    <div className='site'>
      <Title></Title>
      <ProductList></ProductList>
    </div>
  );
}

export default App;
