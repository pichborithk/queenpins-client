import { useNavigate } from 'react-router-dom';
import { Product } from '../type';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className='group flex h-80 cursor-pointer flex-col gap-2 rounded-md p-2'
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <div className='flex w-60 flex-1 justify-center'>
        <img
          src={product.pictures[0]?.url}
          alt={product.title}
          className='h-full object-cover group-hover:scale-105'
        />
      </div>
      <div>
        <h3 className='text-xl font-bold'>{product.title}</h3>
        <h3>{product.price}</h3>
      </div>
    </div>
  );
};
export default ProductCard;
