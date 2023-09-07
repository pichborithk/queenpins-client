import { useOutletContext } from 'react-router-dom';
import { NewReviewData, ViewProductContext } from '../type';
import { FormEvent, useState } from 'react';
import { createReview } from '../helpers/fetchReviews';
import { toast } from 'react-hot-toast';

const ProductReviews = () => {
  const { product, token } = useOutletContext<ViewProductContext>();

  const [reviews, setReviews] = useState(product.reviews);
  const [reviewContent, setReviewContent] = useState('');
  const [reviewRate, setReviewRate] = useState(0);

  function handleSubmitReview(
    token: string,
    productId: number,
    data: NewReviewData
  ) {
    return async function (event: FormEvent) {
      event.preventDefault();
      const result = await createReview(token, productId, data);
      if (result.data) {
        setReviews(prev => [...prev, result.data!]);
        toast.success(result.message);
        setReviewContent('');
      }
    };
  }

  return (
    <div className='flex w-full flex-col items-center gap-4'>
      <h2 className='text-3xl font-bold'>Reviews</h2>
      <div className='mb-4 flex w-full flex-col gap-2'>
        <h3 className='ml-4 text-xl font-bold'>Write a review:</h3>
        <form
          onSubmit={handleSubmitReview(token, product.id, {
            content: reviewContent,
            rate: reviewRate,
          })}
        >
          <fieldset className='flex w-full gap-2'>
            <textarea
              rows={3}
              name='review'
              placeholder='Tell me you thought...'
              value={reviewContent}
              onChange={event => setReviewContent(event.target.value)}
              required
              className='flex-1 resize-none rounded-md border border-solid border-slate-500 px-4 py-2 focus:outline-purple-500 dark:bg-slate-700'
            />
            <select
              className='h-fit rounded-md border border-slate-500 p-2'
              defaultValue={1}
              onChange={event => setReviewRate(Number(event.target.value))}
            >
              {/* <option value='' selected disabled hidden></option> */}
              <option value={1}>1</option>
              <option value={2}>2</option>
              <option value={3}>3</option>
              <option value={4}>4</option>
              <option value={5}>5</option>
            </select>
            <button className='h-fit bg-purple-500 px-4 py-2 text-white'>
              Summit
            </button>
          </fieldset>
        </form>
      </div>
      {reviews.map(review => (
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
