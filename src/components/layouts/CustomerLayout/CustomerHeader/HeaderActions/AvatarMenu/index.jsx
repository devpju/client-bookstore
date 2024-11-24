import { useSelector } from 'react-redux';

const AvatarMenu = () => {
  const urlAvatar = useSelector((state) => state.auth.useInfo?.urlAvatar) || '/images/avatar.jpg';

  return (
    <div className='flex items-center gap-2'>
      <img src={urlAvatar} alt='avatar' className='size-10 rounded-full' />
    </div>
  );
};
export default AvatarMenu;
