import { Dispatch, SetStateAction } from 'react';
import { toast } from 'react-hot-toast';
import { Link, useLocation } from 'react-router-dom';

import logo from '../assets/Quennpins_2.png';

import { ProductAddToCart, UserData } from '../type';

type Props = {
  setToken: Dispatch<SetStateAction<string>>;
  userData: UserData;
  setUserData: Dispatch<SetStateAction<UserData>>;
  setCart: Dispatch<SetStateAction<ProductAddToCart[]>>;
};

const Navbar = ({ setToken, userData, setUserData, setCart }: Props) => {
  const { pathname } = useLocation();
  const [route] = pathname.match(/\w+/) || '';

  function handleSignOut() {
    localStorage.clear();
    setToken('');
    setUserData({ id: null, name: '', email: '', type: '' });
    setCart([]);
    toast.success('Logged Out');
  }

  return (
    <nav className='mb-12 text-2xl font-bold text-purple-500'>
      <div className='mx-auto mb-4 grid max-w-7xl grid-flow-col grid-cols-3 items-center justify-between px-2 py-2'>
        <div className='flex gap-2'>
          <Link
            to='/'
            className='border-b-4 border-transparent px-4 py-2 hover:border-purple-500'
          >
            Home
          </Link>
          <Link
            to='/'
            className='border-b-4 border-transparent px-4 py-2 hover:border-purple-500'
          >
            About
          </Link>
          <Link
            to='/'
            className='border-b-4 border-transparent px-4 py-2 hover:border-purple-500'
          >
            Contact
          </Link>
        </div>
        <div className='flex justify-center'>
          <img src={logo} alt='logo' className='max-h-20' />
        </div>
        <div className='flex justify-end gap-2'>
          {userData.type === 'admin' && (
            <Link
              to='/products/new'
              className='border-b-4 border-transparent px-4 py-2 hover:border-purple-500'
            >
              Add Product
            </Link>
          )}
          {userData.type !== 'admin' && (
            <Link
              to='/cart'
              className='border-b-4 border-transparent px-4 py-2 hover:border-purple-500'
            >
              Cart
            </Link>
          )}

          {userData.email && (
            <Link
              to='/'
              onClick={handleSignOut}
              className='rounded-md border-2 border-purple-600  px-4 py-2 text-xl text-purple-600 hover:bg-inherit hover:bg-purple-600 hover:text-purple-50'
            >
              Sign Out
            </Link>
          )}
          {!userData.email && route !== 'login' && (
            <Link
              to='/login'
              className='rounded-md border-2 border-purple-500 px-4 py-2 text-xl text-purple-500 hover:bg-purple-600 hover:text-purple-100'
            >
              Sign In
            </Link>
          )}
          {!userData.email && route === 'login' && (
            <Link
              to='/register'
              className='rounded-md border-2  bg-purple-600 px-4 py-2 text-xl text-purple-100 hover:border-purple-600'
            >
              Sign Up
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
