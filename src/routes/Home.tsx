import { useOutletContext } from 'react-router-dom';
import { RootContext } from '../type';
import { ProductCard, Slider } from '../components';

const Home = () => {
  const { products } = useOutletContext<RootContext>();

  const newProducts = products.filter(product => product.type === 'new');

  const trendingProducts = products.filter(
    product => product.type === 'trending'
  );

  const saleProducts = products.filter(product => product.type === 'sale');

  return (
    <>
      <div className='w-[100vw]'>
        <Slider />
      </div>
      <h2 className='text-2xl font-bold'>Selected for you</h2>
      <div className='flex w-full gap-4 overflow-x-auto p-2 shadow-full'>
        {newProducts.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <h2 className='text-2xl font-bold'>Trending</h2>
      <div className='flex w-full gap-4 overflow-x-auto p-2 shadow-full'>
        {trendingProducts.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      <h2 className='text-2xl font-bold'>On Sale</h2>
      <div className='flex w-full gap-4 overflow-x-auto p-2 shadow-full'>
        {saleProducts.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div>
      {/* <div className='grid grid-flow-row grid-cols-4 gap-6'>
        {products.map(product => (
          <ProductCard product={product} key={product.id} />
        ))}
      </div> */}
    </>
  );
};

export default Home;
