import { useOutletContext } from 'react-router-dom';
import { RootContext } from '../type';
import { ProductCard } from '../components';

const Home = () => {
  const { products } = useOutletContext<RootContext>();
  return (
    <div className='grid grid-flow-row grid-cols-4 gap-6 px-20'>
      {products.map(product => (
        <ProductCard product={product} key={product.id} />
      ))}
    </div>
  );
};

export default Home;
