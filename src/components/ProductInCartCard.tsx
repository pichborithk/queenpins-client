import { toast } from 'react-hot-toast';
import { removeProductInCart } from '../helpers/fetchCarts';
import { ProductAddToCart } from '../type';
import { Dispatch, SetStateAction } from 'react';

type Props = {
  product: ProductAddToCart;
  token: string;
  setCart: Dispatch<SetStateAction<ProductAddToCart[]>>;
};

const ProductInCartCard = ({ product, token, setCart }: Props) => {
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
      <div className='relative flex-1 px-8 py-2'>
        <h2 className='text-3xl font-bold'>{product.name}</h2>
        <h3 className='text-2xl'>$ {product.price}</h3>
        <h4 className='text-xl text-slate-600'>x {product.quantity}</h4>
        <button className='absolute bottom-4 right-8' onClick={handleDelete}>
          <i className='fa-solid fa-trash-can text-2xl text-purple-600'></i>
        </button>
      </div>
    </div>
  );
};

export default ProductInCartCard;
