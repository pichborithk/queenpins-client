import { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { Product, ProductAddToCart, UserData } from './type';

import { Navbar, Notification, ScrollToTop } from './components';
import { fetchProducts } from './helpers/fetchProducts';
import { fetchUserData } from './helpers/fetchUsers';
import { addProductToCart, fetchUserCart } from './helpers/fetchCarts';

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

  async function getUserCart(token: string, localCart: ProductAddToCart[]) {
    try {
      const result = await fetchUserCart(token);
      if (result.data) {
        const mergedCart = mergeCart(localCart, result.data);
        setCart(mergedCart);
        localStorage.setItem('CART', JSON.stringify(mergedCart));
        mergedCart.forEach(
          async product =>
            await addProductToCart(token, product.id, product.quantity)
        );
      }
    } catch (error) {
      console.error(error);
    }
  }

  function mergeCart(
    localCart: ProductAddToCart[],
    databaseCart: ProductAddToCart[]
  ) {
    if (databaseCart.length === 0) {
      return localCart;
    } else if (localCart.length === 0) {
      return databaseCart;
    } else {
      for (let i = 0; i < localCart.length; i++) {
        for (let j = 0; j < databaseCart.length; j++) {
          if (localCart[i].id === databaseCart[j].id) {
            localCart[i].quantity += databaseCart[j].quantity;
            databaseCart.splice(j, 1);
            break;
          }
        }
      }
      return [...localCart, ...databaseCart];
    }
  }

  async function getInitialData(token: string, localCart: ProductAddToCart[]) {
    try {
      await getUserData(token);
      await getUserCart(token, localCart);
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const initialToken: string = localStorage.getItem('TOKEN') || '';

    if (initialToken) {
      setToken(initialToken);
      getInitialData(initialToken, []);
    } else {
      const localData = localStorage.getItem('CART');
      if (localData) {
        const localCart: ProductAddToCart[] = JSON.parse(localData);
        setCart(localCart);
      }
    }
  }, []);

  async function getProducts() {
    try {
      const result = await fetchProducts();
      if (result.data) {
        setProducts(result.data.products);
      }
    } catch (error) {
      console.error(error);
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
        setCart={setCart}
      />
      <div className='mx-auto mb-8 flex min-h-screen max-w-7xl flex-col items-center gap-4 px-20'>
        <Outlet
          context={{
            products,
            userData,
            getUserData,
            token,
            setToken,
            cart,
            setCart,
            mergeCart,
            setProducts,
            getInitialData,
          }}
        />
      </div>
    </>
  );
};

export default Root;
