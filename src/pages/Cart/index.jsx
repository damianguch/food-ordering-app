import { useSelector } from 'react-redux';
import { cartProducts } from '../../stores/cart/cartSlice';
import useTabSwitch from '../../hooks/useTabSwitch';
import { Tabs } from '../../components/Tabs';
import Button from '../../components/elements/Button';
//import AddressForm from '../../components/AddressForm';
import { ProductsSummary } from '../../components/ProductsSummary';
import { Link } from 'react-router-dom';
import { PayButton } from '../../components/PayButton';
//import { StripeWrapper } from '../../components/PaymentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

const Cart = () => {
  const cart = useSelector(cartProducts);
  const tabs = ['Summary', 'Payment'];
  const [currentTab, handleTabSwitch] = useTabSwitch(tabs, 'Summary');

  if (!cart || cart.length === 0) {
    return (
      <div className="bg-white h-full text-black text-xl flex flex-col items-center justify-start p-4">
        <h1>Your Cart is empty</h1>
        <Link to="/menu" className="font-medium">
          <span className="text-slate-500 hover:text-blue-600">
            Start Shopping
          </span>
          <FontAwesomeIcon icon={faArrowRight} />
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white  mx-auto mt-2 border border-gray-200 p-4 md:2/3 rounded-lg shadow-md sm:p-6 lg:p-8">
      <Tabs list={tabs} onTabSwitch={handleTabSwitch} activeTab={currentTab} />
      <div className={`tabs ${currentTab !== 'Summary' ? 'hidden' : ''}`}>
        <ProductsSummary />
        <div className="flex justify-end p-2">
          <Button
            variant="dark"
            className="flex items-center"
            onClick={() => handleTabSwitch('Payment')}
          >
            <span className="mr-1">CheckOut</span>
          </Button>
        </div>
      </div>
      {/*<div className={`tabs ${currentTab !== 'Delivery' ? 'hidden' : ''}`}>
        <AddressForm onTabSwitch={handleTabSwitch} />
      </div>*/}
      <div className={`tabs ${currentTab !== 'Payment' ? 'hidden' : ''}`}>
        <PayButton cartItems={cart} />
        {/*<StripeWrapper />*/}
      </div>
    </div>
  );
};

export default Cart;
