import { useOutletContext, useParams } from 'react-router-dom';
import { RootContext } from '../type';
import { ImageCard } from '../components';

const ViewProduct = () => {
  const { products } = useOutletContext<RootContext>();

  const { productId } = useParams();

  const product = products.find(p => p.id === Number(productId));

  if (!product) {
    return <div>Not Found</div>;
  }

  return (
    <>
      <div className='flex gap-8 px-20'>
        <div className='flex max-w-[120px] flex-col'>
          {product.photos.map((photo, index) => (
            <ImageCard url={photo.url} productName={product.name} key={index} />
          ))}
        </div>
        <div className='flex-1'>
          <img src={product.photos[0].url} alt={product.name} />
        </div>
        <div className='flex flex-1 flex-col gap-4'>
          <h1 className='text-3xl font-bold'>{product.name}</h1>
          <h2 className='text-2xl'>$ {product.price}</h2>
          <p>{product.description}</p>
        </div>
      </div>
      <div>
        <h1 className='text-4xl font-bold'>Reviews</h1>
      </div>
    </>
  );
};

export default ViewProduct;
