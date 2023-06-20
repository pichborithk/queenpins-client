import { Dispatch, SetStateAction } from 'react';
import { Link } from 'react-router-dom';

// type Props = {
//   setToken: Dispatch<SetStateAction<string>>;
// };

const Navbar = () => {
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
            className='border-purple-500 px-4 py-2  hover:border-b-4'
          >
            Home
          </Link>
          <Link to='/' className='border-purple-500 px-4 py-2 hover:border-b-4'>
            About
          </Link>
          <Link to='/' className='border-purple-500 px-4 py-2 hover:border-b-4'>
            Contact
          </Link>
          <Link
            to='/cart'
            className='border-purple-500 px-4 py-2 hover:border-b-4'
          >
            Cart
          </Link>
        </div>
        {userData.username && (
          <Link
            to='/'
            onClick={handleSignOut}
            className='rounded-md border-2 border-purple-100 bg-purple-100 px-4 py-2 text-xl text-purple-600 hover:border-purple-600 hover:bg-inherit'
          >
            Sign Out
          </Link>
        )}
        {!userData.username && (
          <Link
            to='/login'
            className='rounded-md border-2 border-purple-500 px-4 py-2 text-xl text-purple-500 hover:bg-purple-600 hover:text-purple-100'
          >
            Sign In
          </Link>
        )}
        {!userData.username && route !== 'register' && (
          <Link
            to='/register'
            onClick={() => setRoute('register')}
            className='rounded-md border-2 border-slate-900 bg-purple-600 px-4 py-2 text-xl text-purple-100 hover:border-purple-600'
          >
            Join Us
          </Link>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
