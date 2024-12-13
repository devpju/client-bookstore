import { Link } from 'react-router';

const AuthLinkPrompt = ({ message, linkText, linkTo }) => {
  return (
    <p className='text-center text-sm'>
      {message}
      <Link
        to={linkTo}
        className='ml-2 font-medium text-sky-500 hover:text-sky-700'
      >
        {linkText}
      </Link>
    </p>
  );
};
export default AuthLinkPrompt;
