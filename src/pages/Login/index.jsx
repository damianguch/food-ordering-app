import { useState } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../components/elements/Button';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { Link, useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { auth } from '../../firebase-config';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../stores/userInfo/userSlice';
import { cartProducts } from '../../stores/cart/cartSlice';

const Login = () => {
  let navigate = useNavigate();
  const { register, handleSubmit } = useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const cart = useSelector(cartProducts);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  const onSubmit = (data) => {
    setLoading(true);

    let uid = '';
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        uid = user.uid;
        sessionStorage.setItem('User Id', uid);
        sessionStorage.setItem(
          'Auth token',
          userCredential._tokenResponse.refreshToken
        );
        window.dispatchEvent(new Event('storage'));
        setLoading(false);

        fetch('https://food-ordering-b921316c67e7.herokuapp.com/api/login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: data.email
          })
        })
          .then((res) => {
            if (res.status === 200) {
              toast.success('Login successfully!🎉', {
                position: 'top-right',
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: 'dark'
              });
              setLoading(false);
            }
            return res.json();
          })
          .then((data) => {
            console.log(data.data);
            !isAuthenticated && cart.length > 0
              ? navigate('/cart')
              : navigate('/');
            dispatch(setUser(data.data));
          })
          .catch((error) => {
            setLoading(false);
            console.log(error);
          });
      })
      .catch((error) => {
        if (error.code === 'auth/invalid-login-credentials') {
          toast.error('Wrong Password or Email');
        }

        setLoading(false);
      });
  };
  return (
    <div className="h-screen bg-black flex  items-center justify-center">
      <div className="rounded-lg max-w-md w-full flex flex-col items-center justify-center relative">
        <div className="absolute inset-0 transition duration-300 animate-pink blur  gradient bg-gradient-to-tr from-rose-500 to-yellow-500"></div>
        <div className="p-10 rounded-xl z-10 w-full h-full bg-black">
          <h5 className="text-3xl text-white pl-28">Login</h5>
          <form className="w-full space-y-6" onSubmit={handleSubmit(onSubmit)}>
            <div>
              <label
                htmlFor="email"
                className="block text-lg font-medium text-gray-200"
              >
                Email
              </label>
              <input
                {...register('email')}
                id="email"
                type="email"
                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-lg font-medium text-gray-200"
              >
                Password
              </label>
              <input
                {...register('password')}
                id="password"
                type="password"
                className="block appearance-none w-full px-3 py-2 border border-gray-300 roundedn-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-gray-200 focus:border-gray-200"
              />
            </div>
            <Button size="large">{loading ? 'loading' : 'Login'}</Button>
          </form>
          <div className="text-white text-xl mt-5 pl-7">
            Don't have an account?<Link to="/register"> Sign Up</Link>
          </div>
          <ToastContainer />
        </div>
      </div>
    </div>
  );
};

export default Login;
