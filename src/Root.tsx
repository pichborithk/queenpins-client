import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Product } from './type';

import { Notification, ScrollToTop } from './components';
import { fetchProducts } from './helpers/fetchProducts';

const Root = () => {
  const [products, setProducts] = useState<Product[]>([]);

  async function getProducts() {
    try {
      const result = await fetchProducts();
      if (result.data) {
        setProducts(result.data.products);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      <ScrollToTop />
      <Notification />
      <div className='mx-auto mb-8 flex min-h-screen max-w-7xl flex-col items-center gap-4 px-2'>
        <Outlet context={{ products }} />
      </div>
    </>
  );
};

export default Root;
