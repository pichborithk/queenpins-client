import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Product, UserData } from './type';

import { Navbar, Notification, ScrollToTop } from './components';
import { fetchProducts } from './helpers/fetchProducts';
import { fetchUserData } from './helpers/fetchUsers';

const initialToken: string = localStorage.getItem('TOKEN') || '';

const Root = () => {
  const [token, setToken] = useState(initialToken);
  const [products, setProducts] = useState<Product[]>([]);
  const [userData, setUserData] = useState<UserData>({
    id: null,
    name: '',
    email: '',
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
    if (token) {
      getUserData(token);
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
      <div className='mx-auto mb-8 flex min-h-screen max-w-7xl flex-col items-center gap-4 px-2'>
        <Outlet
          context={{ products, userData, setUserData, token, setToken }}
        />
      </div>
    </>
  );
};

export default Root;
