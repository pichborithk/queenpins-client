import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  setToken: Dispatch<SetStateAction<string>>;
};

const Navbar = ({ setToken }: Props) => {
  // function handleSignOut() {
  //   localStorage.clear();
  //   setRoute('home');
  //   setToken('');
  //   setUserData({ id: 0, username: '' });
  //   toast.success('Logged Out');
  // }

  return (
    <nav className='text-2xl font-bold'>
      <div className='mx-auto mb-4 flex max-w-7xl items-center justify-between px-2'>
        {/* <img src={logo} alt='logo' className='max-h-20' /> */}
        <p>Logo</p>
        <div className='flex justify-between gap-2'>
          <Link
            to='/'
            onClick={() => setRoute('home')}
            className={`border-primary-500 px-4 py-2  hover:border-b-4 ${
              route === 'home' ? 'text-primary-500 border-b-4 uppercase' : ''
            }`}
          >
            Home
          </Link>
          <Link
            to='/pricing'
            onClick={() => setRoute('pricing')}
            className={`border-primary-500 px-4 py-2 hover:border-b-4 ${
              route === 'pricing' ? 'text-primary-500 border-b-4 uppercase' : ''
            }`}
          >
            About
          </Link>
          <Link
            to='/routines'
            onClick={() => setRoute('routines')}
            className={`border-primary-500 px-4 py-2 hover:border-b-4 ${
              route === 'routines'
                ? 'text-primary-500 border-b-4 uppercase'
                : ''
            }`}
          >
            Contact
          </Link>
          <Link
            to='/activities'
            onClick={() => setRoute('activities')}
            className={`border-primary-500 px-4 py-2 hover:border-b-4 ${
              route === 'activities'
                ? 'text-primary-500 border-b-4 uppercase'
                : ''
            }`}
          >
            Cart
          </Link>
          {userData.username && (
            <Link
              to='/profile'
              onClick={() => setRoute('profile')}
              className={`border-primary-500 px-4 py-2 hover:border-b-4 ${
                route === 'profile'
                  ? 'text-primary-500 border-b-4 uppercase'
                  : ''
              }`}
            >
              Profile
            </Link>
          )}
        </div>
        {userData.username && (
          <Link
            to='/'
            onClick={handleSignOut}
            className='border-primary-100 bg-primary-100 text-primary-600 hover:border-primary-600 rounded-md border-2 px-4 py-2 text-xl hover:bg-inherit'
          >
            Sign Out
          </Link>
        )}
        {!userData.username && route === 'register' && (
          <Link
            to='/login'
            onClick={() => setRoute('login')}
            className='border-primary-500 text-primary-500 hover:bg-primary-600 hover:text-primary-100 rounded-md border-2 px-4 py-2 text-xl'
          >
            Sign In
          </Link>
        )}
        {!userData.username && route !== 'register' && (
          <Link
            to='/register'
            onClick={() => setRoute('register')}
            className='bg-primary-600 text-primary-100 hover:border-primary-600 rounded-md border-2 border-slate-900 px-4 py-2 text-xl'
          >
            Join Us
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
