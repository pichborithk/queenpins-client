import {
  Outlet,
  useNavigate,
  useOutletContext,
  useParams,
} from 'react-router-dom';
import { RootContext } from '../type';
import { useState } from 'react';
import { addProductToCart } from '../helpers/fetchCarts';
import { toast } from 'react-hot-toast';
import { deleteProduct } from '../helpers/fetchProducts';
import { SmallPictureCard } from '../components';

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
      title: product.title,
      description: product.description,
      price: product.price,
      pictures: product.pictures,
      quantity: orderAmount,
    };

    const newCart = cart.map(p => {
      if (p.id === productAdd.id) {
        productAdd.quantity += p.quantity;
        return productAdd;
      }
      return p;
    });

    if (productAdd.quantity === orderAmount) {
      newCart.push(productAdd);
    }

    try {
      if (token) {
        await addProductToCart(token, productAdd.id, productAdd.quantity);
      }

      setCart(newCart);
      localStorage.setItem('CART', JSON.stringify(newCart));
      toast.success('Added product to cart');
    } catch (error) {
      console.error(error);
      toast.error('Something went wrong');
    }
  }

  async function handleDelete() {
    if (!product) return;

    try {
      const result = await deleteProduct(token, product.id);
      if (result.error) {
        toast.error(result.message);
      }

      if (result.success) {
        setProducts(prev => prev.filter(p => p.id !== product.id));
        toast.success('Successful delete product');
        navigate('/');
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <>
      <div className='flex w-full gap-8'>
        <div className='flex max-w-[120px] flex-col gap-2'>
          {product.pictures.map((picture, index) => (
            <SmallPictureCard
              url={picture.url}
              productName={product.title}
              key={index}
            />
          ))}
        </div>
        <div className='flex-1'>
          <img src={product.pictures[0]?.url} alt={product.title} />
        </div>
        <div className='flex flex-1 flex-col gap-4'>
          <h2 className='text-3xl font-bold'>{product.title}</h2>
          <h3 className='text-2xl'>{product.price}</h3>
          <p>{product.quantity} left in Stock</p>
          <p>{product.description}</p>
          {userData.type !== 'admin' && (
            <>
              <div className='flex items-center gap-4'>
                <button
                  type='button'
                  className='border px-2 active:bg-purple-100'
                  onClick={() => setOrderAmount(orderAmount - 1)}
                  disabled={orderAmount <= 1}
                >
                  -
                </button>
                <p>{orderAmount}</p>
                <button
                  type='button'
                  className='border px-2 active:bg-purple-100'
                  onClick={() => setOrderAmount(orderAmount + 1)}
                >
                  +
                </button>
              </div>
              <button
                type='button'
                className='w-fit bg-purple-600 px-4 py-2 text-purple-50'
                onClick={handleAddToCart}
              >
                Add to Cart
              </button>
            </>
          )}
          {userData.type === 'admin' && (
            <div>
              <button
                type='button'
                className='w-fit border-2 border-purple-600 bg-purple-600 px-6 py-2 text-purple-50 hover:bg-purple-800'
                onClick={() => navigate(`/products/${product.id}/edit`)}
              >
                Edit
              </button>
              <button
                type='button'
                className='ml-2 w-fit border-2 border-red-500 px-6 py-2 text-red-500 hover:bg-red-500 hover:text-purple-50'
                onClick={handleDelete}
              >
                Delete
              </button>
            </div>
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
