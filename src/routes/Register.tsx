import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { RootContext } from '../type';
import { FormEvent, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { registerUser } from '../helpers/fetchUsers';

const Register = () => {
  const { token, setToken, setUserData } = useOutletContext<RootContext>();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [hidePassword, setHidePassword] = useState(true);

  useEffect(() => {
    if (token) {
      navigate('/');
      return;
    }
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (password !== confirmPassword) {
      toast.error('Password do not match');
      setEmail('');
      setName('');
      setPassword('');
      setConfirmPassword('');
      return;
    }

    try {
      const result = await registerUser({ email, name, password });
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
        });
        navigate('/');
        toast.success('Registration success');
        toast.success('Logged In');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setEmail('');
      setName('');
      setPassword('');
      setConfirmPassword('');
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
          autoComplete='off'
          type='email'
          name='email'
          placeholder='Enter Email'
          value={email}
          onChange={event => setEmail(event.target.value)}
          required
          className='rounded-md border border-solid px-4 py-2 text-slate-700 focus:outline-purple-500'
        />
      </fieldset>
      <fieldset className='flex w-full flex-col'>
        <label htmlFor='name' className='px-4 py-2'>
          Name
        </label>
        <input
          autoComplete='off'
          type='text'
          name='name'
          placeholder='Enter Your Name'
          value={name}
          onChange={event => setName(event.target.value)}
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
          } ${!(password || confirmPassword) && 'hidden'}`}
          onClick={() => setHidePassword(!hidePassword)}
        ></i>
      </fieldset>
      <fieldset className='relative flex w-full flex-col'>
        <label htmlFor='confirm-password' className='px-4 py-2'>
          Password Confirmation
        </label>
        <input
          type={hidePassword ? 'password' : 'text'}
          name='confirm-password'
          placeholder='Re-enter Password'
          value={confirmPassword}
          onChange={event => setConfirmPassword(event.target.value)}
          required
          className='rounded-md border border-solid px-4 py-2 text-slate-700 focus:outline-purple-500'
        />
        <i
          className={`fa-solid absolute bottom-3 right-4 text-purple-600  ${
            hidePassword ? 'fa-eye-slash' : 'fa-eye'
          } ${!(password || confirmPassword) && 'hidden'}`}
          onClick={() => setHidePassword(!hidePassword)}
        ></i>
      </fieldset>
      <div className='mt-2 w-full text-center'>
        <button className='mb-2 w-full rounded-lg border-purple-600 bg-purple-600 px-4 py-2 font-semibold text-purple-100 hover:bg-purple-800'>
          Create Account
        </button>
        <p className='text-base'>
          Already Have An Account?{' '}
          <Link to='/login' className='underline hover:text-purple-500'>
            Sign in
          </Link>
        </p>
      </div>
    </form>
  );
};

export default Register;
