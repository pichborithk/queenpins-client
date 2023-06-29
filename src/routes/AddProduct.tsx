import { FormEvent, useState } from 'react';
import { DynamicInput, Input } from '../components';
import { useNavigate, useOutletContext } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import { NewProductData, RootContext } from '../type';
import { createProduct } from '../helpers/fetchProducts';

const AddProduct = () => {
  const { token, setProducts } = useOutletContext<RootContext>();
  const navigate = useNavigate();

  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [type, setType] = useState('');
  const [pictures, setPictures] = useState<string[]>([]);

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
        setTitle('');
        setDescription('');
        setPrice('');
        setQuantity('');
        setPictures([]);
      }
    };
  }

  function handleCancel() {
    setTitle('');
    setDescription('');
    setPrice('');
    setQuantity('');
    setPictures([]);
    navigate('/');
  }

  // const preset_key = 'h4euqds3';
  // const cloud_name = 'du9bpvlz1';

  // async function handleFile(event) {
  //   const file = event.target.files[0];
  //   const formData = new FormData();
  //   formData.append('file', file);
  //   formData.append('upload_preset', preset_key);
  //   const response = await fetch(
  //     `https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`,
  //     {
  //       method: 'POST',
  //       body: formData,
  //     }
  //   );

  //   const result = await response.json();
  //   console.log(result.secure_url);
  // }

  return (
    <form
      onSubmit={handleSubmit(token, {
        title,
        description,
        price,
        quantity: Number(quantity),
        urls: pictures,
      })}
      className='relative flex w-1/2 flex-col items-center justify-evenly gap-8 rounded-2xl border bg-purple-100 px-20 py-12 text-xl text-purple-100 shadow-full'
    >
      <h1 className='text-4xl font-bold text-purple-500'>Create New Product</h1>
      {/* <input
        type='file'
        name='image'
        onChange={handleFile}
      ></input> */}
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
      <Input
        value={type}
        setValue={setType}
        name='product-type'
        type='text'
        required={true}
        label='type*'
      />
      <DynamicInput
        value={pictures}
        setValue={setPictures}
        name='picture'
        type='text'
        required={true}
        label='Picture URL'
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
