import { ProductAddToCart } from '../type';

type Props = {
  product: ProductAddToCart;
};

const ProductInCartCard = ({ product }: Props) => {
  return (
    <div className='flex bg-slate-100'>
      <img
        src={product.photos[0].url}
        alt={product.name}
        className='max-w-[200px]'
      />
      <div className='px-8 py-2'>
        <h2 className='text-3xl font-bold'>{product.name}</h2>
        <h3 className='text-2xl'>$ {product.price}</h3>
        <h4 className='text-xl text-slate-600'>x {product.quantity}</h4>
      </div>
    </div>
  );
};

export default ProductInCartCard;
