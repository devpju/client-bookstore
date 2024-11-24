import AvatarMenu from './AvatarMenu';
import Cart from './Cart';
import Notification from './Notification';

const HeaderActions = () => {
  return (
    <div className='flex items-center gap-2'>
      <Notification />
      <Cart />
      <AvatarMenu />
    </div>
  );
};
export default HeaderActions;
