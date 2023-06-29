import { FormEvent, useState } from 'react';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { NewProductData, ViewProductContext } from '../type';
import { toast } from 'react-hot-toast';
import { DynamicInput, Input } from '../components';
import { updateProduct } from '../helpers/fetchProducts';

const EditProduct = () => {
  const { token, setProducts, product } =
    useOutletContext<ViewProductContext>();
  const navigate = useNavigate();

  const [title, setTitle] = useState(product.title);
  const [description, setDescription] = useState(product.description);
  const [price, setPrice] = useState(product.price);
  const [quantity, setQuantity] = useState(product.quantity.toString());
  const [type, setType] = useState(product.type);
  const [pictures, setPictures] = useState<string[]>(
    product.pictures.map(picture => picture.url)
  );

  function handleSubmit(
    token: string,
    productId: number,
    data: NewProductData
  ) {
    return async function (event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      try {
        const result = await updateProduct(token, productId, data);
        console.log(result);

        if (result.error) {
          toast.error(result.message);
        }

        if (result.data) {
          setProducts(prev =>
            prev.map(product => {
              if (product.id === result.data?.id) {
                return result.data;
              }
              return product;
            })
          );
          toast.success('Successful update product');
          navigate(`/products/${productId}`);
        }
      } catch (error) {
        console.error(error);
      }
    };
  }

  function handleCancel() {
    navigate(`/products/${product.id}`);
  }

  return (
    <form
      onSubmit={handleSubmit(token, product.id, {
        title,
        description,
        price,
        quantity: Number(quantity),
        urls: pictures,
      })}
      className='relative flex w-1/2 flex-col items-center justify-evenly gap-8 rounded-2xl border bg-purple-100 px-20 py-12 text-xl text-purple-100 shadow-full'
    >
      <h1 className='text-4xl font-bold text-purple-500'>Create New Product</h1>
      <Input
        value={title}
        setValue={setTitle}
        name='product-name'
        type='text'
        required={true}
        label='Name*'
      />
      <Input
        value={description}
        setValue={setDescription}
        name='routine-name'
        type='text'
        required={true}
        label='Description*'
      />
      <Input
        value={price}
        setValue={setPrice}
        name='product-price'
        type='text'
        required={true}
        label='Price*'
      />
      <Input
        value={quantity}
        setValue={setQuantity}
        name='product-quantity'
        type='text'
        required={true}
        label='Quantity*'
      />
      <DynamicInput
        value={pictures}
        setValue={setPictures}
        name='picture'
        type='text'
        required={true}
        label='picture URL'
      />
      <div className='w-full'>
        <button className='mb-2 w-full rounded-lg border-2 border-purple-600 px-4 py-2 font-bold text-purple-500 hover:bg-purple-600 hover:text-purple-50'>
          Save
        </button>
        <button
          type='button'
          onClick={() => handleCancel()}
          className='mb-2 w-full rounded-lg border-2 border-purple-600 px-4 py-2 font-bold text-purple-500 hover:bg-purple-600 hover:text-purple-50'
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditProduct;
