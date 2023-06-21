import {
  useNavigate,
  useOutletContext,
  useSearchParams,
} from 'react-router-dom';
import { RootContext } from '../type';
import { useEffect } from 'react';
import { toast } from 'react-hot-toast';

const Checkout = () => {
  const { setCart } = useOutletContext<RootContext>();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const result = searchParams.get('success');

  useEffect(() => {
    if (result === 'true') {
      setCart([]);
      localStorage.removeItem('CART');
      toast.success('Success purchase product(s)');
    } else {
      navigate('/');
    }
  }, []);

  return (
    <div className='flex flex-col gap-24 rounded-lg bg-purple-50 px-20 py-24 text-center shadow-full'>
      {result === 'true' && (
        <>
          <h1 className='text-5xl font-bold text-purple-500'>
            Payment Complete
          </h1>
          <i className='fa-solid fa-circle-check text-6xl text-green-500'></i>
          <h1 className='text-5xl font-bold text-purple-500'>Thank You</h1>{' '}
        </>
      )}
    </div>
  );
};

export default Checkout;
