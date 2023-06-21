import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { RootContext } from '../type';
import { FormEvent, useEffect, useState } from 'react';
import { userLogin } from '../helpers/fetchUsers';
import { toast } from 'react-hot-toast';

const Login = () => {
  const { token, setToken, setUserData } = useOutletContext<RootContext>();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    if (token) {
      navigate('/');
      return;
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    try {
      const result = await userLogin({ email, password });
      if (result.error) {
        toast.error(result.message);
        return;
      }

      if (result.data) {
        setToken(result.data.token);
        localStorage.setItem('TOKEN', result.data.token);
        setUserData({
          id: result.data.id,
          email: result.data.email,
          name: result.data.name,
          type: result.data.type,
        });
        navigate('/');
        toast.success('Logged In');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEmail('');
      setPassword('');
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className='relative flex w-1/2 flex-col items-center justify-evenly gap-8 rounded-2xl border px-20 py-12 text-xl text-purple-950 shadow-full'
    >
      <h1 className='text-4xl font-bold text-purple-500'>Create An Account</h1>
      <fieldset className='flex w-full flex-col'>
        <label htmlFor='email' className='px-4 py-2'>
          Email
        </label>
        <input
          type='email'
          name='email'
          placeholder='Enter Email'
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
          className='rounded-md border border-solid px-4 py-2 text-slate-700 focus:outline-purple-500'
        />
      </fieldset>
      <fieldset className='relative flex w-full flex-col'>
        <label htmlFor='password' className='px-4 py-2'>
          Password
        </label>
        <input
          type={hidePassword ? 'password' : 'text'}
          name='password'
          placeholder='Enter Password'
          value={password}
          onChange={event => setPassword(event.target.value)}
          required
          className='rounded-md border border-solid px-4 py-2 text-slate-700 focus:outline-purple-500'
        />
        <i
          className={`fa-solid absolute bottom-3 right-4 text-purple-600  ${
            hidePassword ? 'fa-eye-slash' : 'fa-eye'
          } ${!password && 'hidden'}`}
          onClick={() => setHidePassword(!hidePassword)}
        ></i>
      </fieldset>
      <div className='mt-2 w-full text-center'>
        <button className='mb-2 w-full rounded-lg border-purple-600 bg-purple-600 px-4 py-2 font-semibold text-purple-100 hover:bg-purple-800'>
          Sign In
        </button>
        <p className='text-base'>
          Forget{' '}
          <a href='#' className='hover:text-primary-500 text-slate-500'>
            Username / Password
          </a>{' '}
          ?
        </p>
        <p className='text-base'>
          Don't have an account?{' '}
          <Link to='/login' className='underline hover:text-purple-500'>
            Join Us
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Login;
