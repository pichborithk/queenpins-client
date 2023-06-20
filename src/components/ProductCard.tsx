import { Product } from '../type';

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  return (
    <div className='shadow-full'>
      <img src={product.photos[0].url} alt={product.name} />
      <h3>{product.name}</h3>
      <h3>$ {product.price}</h3>
    </div>
  );
};
export default ProductCard;
