import useCountdown from '@/hooks/useCountdown';
import SubmitFormButton from '../buttons/SubmitFormButton';
import { toast } from 'sonner';

const ResendEmailPrompt = ({ onClick, isLoading }) => {
  const [countdown, setCountDown] = useCountdown(10);
  const handleClick = () => {
    if (countdown === 0) {
      onClick();
      setCountDown(10);
    } else {
      toast.error(`Vui lòng chờ thêm ${countdown} giây trước khi được gửi lại`);
    }
  };

  return (
    <div className='flex items-center justify-center text-sm text-primary'>
      <p>Bạn không nhận được email?</p>
      <SubmitFormButton
        variant='ghost'
        isLoading={isLoading}
        onClick={handleClick}
        className='px-2 text-sky-500 hover:text-sky-600'
      >
        Gửi lại
      </SubmitFormButton>
    </div>
  );
};
export default ResendEmailPrompt;
