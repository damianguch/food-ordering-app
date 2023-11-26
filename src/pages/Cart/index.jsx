import { useSelector } from 'react-redux';
import { cartProducts } from '../../stores/cart/cartSlice';
import useTabSwitch from '../../hooks/useTabSwitch';
import { Tabs } from '../../components/Tabs';
import Button from '../../components/elements/Button';
import { ReactComponent as ArrowRightSvg } from '../../assets/icons/arrow-right-long-svgrepo-com.svg';
import AddressForm from '../../components/AddressForm';
import { ProductsSummary } from '../../components/ProductsSummary';
import { Link } from 'react-router-dom';
// import { PayButton } from '../../components/PayButton';
import { StripeWrapper } from '../../components/PaymentForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { icon } from '@fortawesome/fontawesome-svg-core/import.macro';

const Cart = () => {
  const cart = useSelector(cartProducts);
  const tabs = ['Summary', 'Delivery', 'Payment'];
  const [currentTab, handleTabSwitch] = useTabSwitch(tabs, 'Summary');

  if (!cart || cart.length === 0) {
    return (
      <div className="bg-white h-full text-black text-xl flex flex-col items-center justify-start p-4">
        <h1>Your Cart is empty</h1>
        <Link to="/" className="font-medium">
          <span> Start Shopping</span>
          <FontAwesomeIcon
            icon="fa-solid fa-arrow-right"
            className="text-black"
          />
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
            onClick={() => handleTabSwitch('Delivery')}
          >
            <span className="mr-1">CheckOut</span>
            <ArrowRightSvg />
          </Button>
        </div>
      </div>
      <div className={`tabs ${currentTab !== 'Delivery' ? 'hidden' : ''}`}>
        <AddressForm onTabSwitch={handleTabSwitch} />
      </div>
      <div className={`tabs ${currentTab !== 'Payment' ? 'hidden' : ''}`}>
        {/*<PayButton cartItems={cart} />*/}
        <StripeWrapper />
      </div>
    </div>
  );
};

export default Cart;
