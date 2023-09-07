import { useOutletContext } from 'react-router-dom';
import { ViewProductContext } from '../type';
import { FormEvent, useState } from 'react';

const ProductReviews = () => {
  const { product } = useOutletContext<ViewProductContext>();

  const [review, setReview] = useState('');

  // function handleSubmitReview(id: string, token: string, comment: string) {
  //   return async function (event: FormEvent) {
  //     event.preventDefault();
  //     const result = await createComment(id, token, comment);
  //     if (result) {
  //       setComment('');
  //       await getPosts(token);
  //       await getUserData(token);
  //     }
  //   };
  // }

  return (
    <div className='flex w-full flex-col items-center gap-4'>
      <h2 className='text-3xl font-bold'>Reviews</h2>
      <div className='mb-4 flex w-full flex-col gap-2'>
        <h3 className='ml-4 text-xl font-bold'>Write a review:</h3>
        <form>
          <fieldset className='flex w-full gap-2'>
            <input
              name='review'
              placeholder='Tell me you thought...'
              value={review}
              onChange={event => setReview(event.target.value)}
              required
              className='flex-1 rounded-md border border-solid border-slate-500 px-4 py-2 focus:outline-purple-500 dark:bg-slate-700'
            />
            {review && (
              <button className='bg-purple-500 px-4 text-white'>Summit</button>
            )}
          </fieldset>
        </form>
      </div>
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
