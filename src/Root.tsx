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

  async function getUserCart(token: string) {
    try {
      const result = await fetchUserCart(token);
      if (result.data) {
        setCart(result.data);
        console.log(result.data);
        localStorage.setItem('CART', JSON.stringify(result.data));
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function mergeUserCart(token: string, local_cart: ProductAddToCart[]) {
    try {
      const result = await fetchUserCart(token);
      if (!result.data) return;
      console.log(result);
      const database_cart = result.data;

      if (database_cart.length <= 0) {
        cart.forEach(
          async product =>
            await addProductToCart(token, product.id, product.quantity)
        );
        return;
      }

      for (let i = 0; i < local_cart.length; i++) {
        for (let j = 0; j < database_cart.length; j++) {
          if (local_cart[i].id === database_cart[j].id) {
            local_cart[i].quantity += database_cart[j].quantity;
            database_cart.splice(j, 1);
            break;
          }
        }
      }
      const merge_cart = [...local_cart, ...database_cart];
      console.log(merge_cart);
      setCart(merge_cart);
      localStorage.setItem('CART', JSON.stringify(merge_cart));
      merge_cart.forEach(
        async product =>
          await addProductToCart(token, product.id, product.quantity)
      );
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    const initialToken: string = localStorage.getItem('TOKEN') || '';
    const local_data = localStorage.getItem('CART');

    if (local_data) {
      const local_cart = JSON.parse(local_data);
      setCart(local_cart);
    }

    if (initialToken) {
      setToken(initialToken);
      getUserData(initialToken);
      getUserCart(initialToken);
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
        setCart={setCart}
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
            mergeUserCart,
            getUserCart,
          }}
        />
      </div>
    </>
  );
};

export default Root;
