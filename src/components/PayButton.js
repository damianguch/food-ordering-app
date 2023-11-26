import axios from 'axios';
import Button from './elements/Button';
import { useSelector } from 'react-redux';
import { selectUser } from '../stores/userInfo/userSlice';

export const PayButton = ({ cartItems }) => {
  const user = useSelector(selectUser);
  const handleCheckout = () => {
    axios
      .post(
        'https://food-ordering-b921316c67e7.herokuapp.com/api/create-checkout-session',
        {
          cartItems,
          user: user._id
        }
      )
      .then((res) => {
        if (res.data.url) {
          window.location.href = res.data.url;
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  return (
    <Button variant="dark" onClick={() => handleCheckout()}>
      <span>Pay Now</span>
    </Button>
  );
};
