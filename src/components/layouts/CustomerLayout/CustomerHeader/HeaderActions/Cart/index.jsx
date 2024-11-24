import { Button } from '@/components/ui/button';
import { ShoppingCartIcon } from 'lucide-react';

const Cart = () => {
  return (
    <div>
      <Button variant='ghost' size='icon'>
        <ShoppingCartIcon className='!size-6' />
      </Button>
    </div>
  );
};
export default Cart;
