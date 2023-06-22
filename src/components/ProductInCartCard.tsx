import { toast } from 'react-hot-toast';
import {
  removeProductInCart,
  updateProductInCart,
} from '../helpers/fetchCarts';
import { ProductAddToCart } from '../type';
import { Dispatch, SetStateAction, useState } from 'react';

type Props = {
  product: ProductAddToCart;
  token: string;
  setCart: Dispatch<SetStateAction<ProductAddToCart[]>>;
};

const ProductInCartCard = ({ product, token, setCart }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const [orderAmount, setOrderAmount] = useState(product.quantity);

  async function handleUpdate() {
    if (product.quantity === orderAmount) {
      setIsEditing(false);
      return;
    }

    try {
      const result = await updateProductInCart(token, product.id, orderAmount);
      if (result.success) {
        toast.success('Success update amount of product in cart');
        product.quantity = orderAmount;
        setCart(prevCart =>
          prevCart.map(p => {
            if (p.id === product.id) {
              return product;
            }
            return p;
          })
        );
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsEditing(false);
    }
  }

  async function handleDelete() {
    try {
      const result = await removeProductInCart(token, product.id);
      if (result.success) {
        toast.success('Remove product(s) from cart');
        setCart(prevCart => prevCart.filter(p => product.id !== p.id));
      }
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className='flex bg-slate-100'>
      <img
        src={product.photos[0].url}
        alt={product.name}
        className='max-w-[200px]'
      />
      <div className='relative flex flex-1 flex-col justify-between gap-2 px-8 py-2'>
        <h2 className='text-3xl font-bold'>{product.name}</h2>
        <h3 className='text-2xl'>$ {product.price}</h3>

        {isEditing && (
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
              className='w-fit border border-purple-600 bg-purple-500 px-4 py-1 font-bold text-purple-50'
              onClick={handleUpdate}
            >
              Save
            </button>
          </>
        )}
        {!isEditing && (
          <>
            <h4 className='text-xl text-slate-600'>x {product.quantity}</h4>
            <button
              className='w-fit border border-purple-600 px-4 py-1 font-bold text-purple-500'
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          </>
        )}
        <button className='absolute bottom-4 right-8' onClick={handleDelete}>
          <i className='fa-solid fa-trash-can text-2xl text-purple-600'></i>
        </button>
      </div>
    </div>
  );
};

export default ProductInCartCard;
