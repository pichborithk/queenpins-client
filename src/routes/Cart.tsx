import { useOutletContext } from 'react-router-dom';
import { RootContext } from '../type';
import { ProductInCartCard } from '../components';
import { checkOutCart } from '../helpers/fetchCheckout';

const Cart = () => {
  const { token, cart, setCart } = useOutletContext<RootContext>();

  const totalPrice = cart
    .map(
      product =>
        Number(product.price.replace('$', '')) * Number(product.quantity)
    )
    .reduce((a, b) => a + b, 0)
    .toFixed(2);

  async function handleCheckOut() {
    try {
      const result = await checkOutCart(token, cart);
      console.log(result);
      location.replace(result.data.url);
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <h1 className='text-4xl font-bold text-purple-600'>CART</h1>
      <div className='flex w-full flex-col gap-4 rounded-lg p-4 shadow-full'>
        {cart.map(product => (
          <ProductInCartCard
            key={product.id}
            product={product}
            token={token}
            setCart={setCart}
          />
        ))}
        <hr />
        <div className='px-4 text-right'>
          <h2 className='text-3xl font-bold'>Total</h2>
          <h2 className='text-2xl font-bold'>$ {totalPrice}</h2>
          <button
            className='mt-4 w-fit bg-purple-600 px-4 py-2 text-purple-50'
            onClick={handleCheckOut}
          >
            Check Out
          </button>
        </div>
      </div>
    </>
  );
};

export default Cart;
