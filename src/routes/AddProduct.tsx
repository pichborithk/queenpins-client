import { useState } from 'react';
import { DynamicInput, Input } from '../components';

const AddProduct = () => {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [photos, setPhotos] = useState<{ url: string }[]>([]);

  return (
    <form
      // onSubmit={handleSubmit(token, {
      //   name,
      //   goal,
      //   isPublic: publicRef.current?.checked || false,
      // })}
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
          // onClick={() => handleCancel()}
          className='mb-2 w-full rounded-lg border-2 border-purple-600 px-4 py-2 font-bold text-purple-500 hover:bg-purple-600 hover:text-purple-50'
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default AddProduct;
