import { useOutletContext, useParams } from 'react-router-dom';
import { RootContext } from '../type';
import { ImageCard } from '../components';
import { useState } from 'react';

const ViewProduct = () => {
  const { products, cart, setCart } = useOutletContext<RootContext>();

  const { productId } = useParams();
  const [orderAmount, setOrderAmount] = useState(1);
  const product = products.find(p => p.id === Number(productId));

  if (!product) {
    return <div>Not Found</div>;
  }

  function handleAddToCart() {
    if (!product) return;

    const productAdd = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      photos: product.photos,
      quantity: orderAmount,
    };

    const new_cart = cart.map(p => {
      if (p.id === productAdd.id) {
        p.quantity += productAdd.quantity;
        productAdd.quantity = 0;
      }
      return p;
    });

    if (productAdd.quantity > 0) {
      new_cart.push(productAdd);
    }

    setCart(new_cart);
    localStorage.setItem('CART', JSON.stringify(new_cart));
  }

  return (
    <>
      <div className='flex gap-8'>
        <div className='flex max-w-[120px] flex-col'>
          {product.photos.map((photo, index) => (
            <ImageCard url={photo.url} productName={product.name} key={index} />
          ))}
        </div>
        <div className='flex-1'>
          <img src={product.photos[0].url} alt={product.name} />
        </div>
        <div className='flex flex-1 flex-col gap-4'>
          <h2 className='text-3xl font-bold'>{product.name}</h2>
          <h3 className='text-2xl'>$ {product.price}</h3>
          <p>{product.description}</p>
          <div className='flex items-center gap-4'>
            <button
              className='border px-2 active:bg-purple-100'
              onClick={() => setOrderAmount(orderAmount - 1)}
              disabled={orderAmount <= 1}
            >
              -
            </button>
            <p>{orderAmount}</p>
            <button
              className='border px-2 active:bg-purple-100'
              onClick={() => setOrderAmount(orderAmount + 1)}
            >
              +
            </button>
          </div>
          <button
            className='w-fit bg-purple-600 px-4 py-2 text-purple-50'
            onClick={handleAddToCart}
          >
            Add to Cart
          </button>
        </div>
      </div>
      <div>
        <h1 className='text-4xl font-bold'>Reviews</h1>
      </div>
    </>
  );
};

export default ViewProduct;
