import { ShoppingCartIcon } from 'lucide-react';
import { Link } from 'react-router';

const Cart = () => {
  return (
    <div>
      <Link to='/cart' className='block px-4'>
        <ShoppingCartIcon className='!size-6' />
      </Link>
    </div>
  );
};
export default Cart;
