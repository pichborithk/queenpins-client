import { useOutletContext } from 'react-router-dom';
import { RootContext } from '../type';
import { ProductCard, Slider } from '../components';

const Home = () => {
  const { products } = useOutletContext<RootContext>();
  return (
    <>
      <div className='w-[100vw]'>
        <Slider />
      </div>
      <div className='grid grid-flow-row grid-cols-4 gap-6'>
        {products.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
    </>
  );
};

export default Home;
