import { useOutletContext } from 'react-router-dom';
import { RootContext } from '../type';
import { ProductInCartCard } from '../components';

const Cart = () => {
  const { cart } = useOutletContext<RootContext>();
  const totalPrice = cart
    .map(product => parseInt(product.price) * Number(product.quantity))
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  return (
    <>
      <h1 className='text-4xl font-bold text-purple-600'>CART</h1>
      <div className='flex w-full flex-col gap-4 rounded-lg p-4 shadow-full'>
        {cart.map(product => (
          <ProductInCartCard key={product.id} product={product} />
        ))}
        <hr />
        <div className='px-4 text-right'>
          <h2 className='text-3xl font-bold'>Total</h2>
          <h2 className='text-2xl font-bold'>$ {totalPrice}</h2>
          <button className='mt-4 w-fit bg-purple-600 px-4 py-2 text-purple-50'>
            Check Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
