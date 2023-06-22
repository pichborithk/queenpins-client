import { FormEvent, useState } from 'react';
import { DynamicInput, Input } from '../components';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { NewProductData, RootContext } from '../type';
import { createProduct } from '../helpers/fetchProducts';

const AddProduct = () => {
  const { token, setProducts } = useOutletContext<RootContext>();
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photos, setPhotos] = useState<string[]>([]);

  function handleSubmit(token: string, data: NewProductData) {
    return async function (event: FormEvent<HTMLFormElement>) {
      event.preventDefault();

      try {
        const result = await createProduct(token, data);
        console.log(result);

        if (result.error) {
          toast.error(result.message);
        }

        if (result.data) {
          setProducts(prev => [...prev, result.data!]);
          toast.success('Successful create new product');
          navigate('/');
        }
      } catch (error) {
        console.error(error);
      } finally {
        setName('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setPhotos([]);
      }
    };
  }

  function handleCancel() {
    setName('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setPhotos([]);
    navigate('/');
  }

  return (
    <form
      onSubmit={handleSubmit(token, {
        name,
        description,
        price,
        quantity: Number(quantity),
        urls: photos,
      })}
      className='shadow-full_white relative flex w-1/2 flex-col items-center justify-evenly gap-8 rounded-2xl border bg-purple-100 px-20 py-12 text-xl text-purple-100'
    >
      <h1 className='text-4xl font-bold text-purple-500'>Create New Product</h1>
      <Input
        value={name}
        setValue={setName}
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
        value={photos}
        setValue={setPhotos}
        name='photo'
        type='text'
        required={true}
        label='Photo URL'
      />
      <div className='w-full'>
        <button className='mb-2 w-full rounded-lg border-2 border-purple-600 px-4 py-2 font-bold text-purple-500 hover:bg-purple-600 hover:text-purple-50'>
          Create
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

export default AddProduct;
