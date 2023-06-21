import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Product, ProductAddToCart, UserData } from './type';

import { Navbar, Notification, ScrollToTop } from './components';
import { fetchProducts } from './helpers/fetchProducts';
import { fetchUserData } from './helpers/fetchUsers';

const Root = () => {
  const [token, setToken] = useState('');
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<ProductAddToCart[]>([]);
  const [userData, setUserData] = useState<UserData>({
    id: null,
    name: '',
    email: '',
    type: '',
  });

  async function getUserData(token: string) {
    try {
      const result = await fetchUserData(token);
      if (result.data) {
        setUserData(result.data);
      }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const initialToken: string = localStorage.getItem('TOKEN') || '';
    const local_data = localStorage.getItem('CART');

    if (local_data) {
      const local_cart: ProductAddToCart[] = JSON.parse(local_data);
      setCart(local_cart);
    }

    if (initialToken) {
      setToken(initialToken);
      getUserData(initialToken);
    }
  }, []);

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
      <Navbar
        setToken={setToken}
        userData={userData}
        setUserData={setUserData}
      />
      <div className='mx-auto mb-8 flex min-h-screen max-w-7xl flex-col items-center gap-4 px-20'>
        <Outlet
          context={{
            products,
            userData,
            setUserData,
            token,
            setToken,
            cart,
            setCart,
          }}
        />
      </div>
    </>
  );
};

export default Root;
