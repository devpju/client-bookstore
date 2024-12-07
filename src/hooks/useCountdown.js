import { useEffect, useState } from 'react';

const useCountdown = (initialCount, onComplete) => {
  const [countdown, setCountdown] = useState(initialCount);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    } else if (countdown === 0 && onComplete) {
      onComplete();
    }
  }, [countdown, onComplete]);

  const resetCountdown = (newCount) => setCountdown(newCount);
  return [countdown, resetCountdown];
};

export default useCountdown;
