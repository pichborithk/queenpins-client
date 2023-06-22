import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { RootContext } from '../type';
import { ImageCard } from '../components';
import { useState } from 'react';
import { addProductToCart } from '../helpers/fetchCarts';
import { toast } from 'react-hot-toast';

const ViewProduct = () => {
  const { token, products, cart, setCart, userData, setProducts } =
    useOutletContext<RootContext>();
  const navigate = useNavigate();

  const { productId } = useParams();
  const [orderAmount, setOrderAmount] = useState(1);
  const product = products.find(p => p.id === Number(productId));

  if (!product) {
    return <div>Not Found</div>;
  }

  async function handleAddToCart() {
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
        productAdd.quantity += p.quantity;
        return productAdd;
      }
      return p;
    });

    if (productAdd.quantity === orderAmount) {
      new_cart.push(productAdd);
    }

    if (token) {
      await addProductToCart(token, productAdd.id, productAdd.quantity);
    }

    setCart(new_cart);
    localStorage.setItem('CART', JSON.stringify(new_cart));
    toast.success('Added product to cart');
  }

  return (
    <>
      <div className='flex gap-8'>
        <div className='flex max-w-[120px] flex-col gap-2'>
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
          <p>{product.quantity} left in Stock</p>
          <p>{product.description}</p>
          {userData.type === 'user' && (
            <>
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
            </>
          )}
          {userData.type === 'admin' && (
            <button
              className='w-fit bg-purple-600 px-6 py-2 text-purple-50'
              onClick={() => navigate(`/products/${product.id}/edit`)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
      <hr className='my-4 w-full' />
      <div className='flex w-full justify-center'>
        <Outlet context={{ token, setProducts, product }} />
      </div>
    </>
  );
};

export default ViewProduct;
