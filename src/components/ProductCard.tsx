import { useNavigate } from 'react-router-dom';
import { Product } from '../type';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className='group flex h-80 cursor-pointer flex-col gap-2 rounded-md p-2 shadow-full'
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className='flex flex-1 justify-center'>
        <img
          src={product.photos[0]?.url}
          alt={product.name}
          className='h-full object-cover group-hover:scale-105'
        />
      </div>
      <div className=''>
        <h3 className='text-xl font-bold'>{product.name}</h3>
        <h3>$ {product.price}</h3>
      </div>
    </div>
  );
};
export default ProductCard;
