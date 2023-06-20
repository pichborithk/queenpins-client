import { useNavigate } from 'react-router-dom';
import { Product } from '../type';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const navigate = useNavigate();

  return (
    <div
      className='cursor-pointer shadow-full'
      onClick={() => navigate(`/products/${product.id}`)}
    >
      <img src={product.photos[0].url} alt={product.name} />
      <h3>{product.name}</h3>
      <h3>$ {product.price}</h3>
    </div>
  );
};
export default ProductCard;
