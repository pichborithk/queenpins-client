import { useOutletContext } from 'react-router-dom';
import { ViewProductContext } from '../type';

const ProductReviews = () => {
  const { token, product } = useOutletContext<ViewProductContext>();

  return (
    <div className='flex w-full flex-col items-center gap-4'>
      <h2 className='text-3xl font-bold'>Reviews</h2>
      {product.reviews.map(review => (
        <div key={review.id} className='flex w-full flex-col gap-2'>
          <div className='flex items-center gap-2'>
            <p className='rounded-full bg-purple-500 px-4 py-2 font-bold text-white'>
              {review.name[0].toUpperCase()}
            </p>
            <h3 className='text-xl font-bold'>{review.name}</h3>
          </div>
          <p>{review.content}</p>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ProductReviews;
