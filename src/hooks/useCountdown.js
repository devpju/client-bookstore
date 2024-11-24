import { useEffect, useState } from 'react';

const useCountdown = (initialCount) => {
  const [countdown, setCountdown] = useState(initialCount);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      return () => clearInterval(timer);
    }
  }, [countdown]);

  return [countdown, setCountdown];
};

export default useCountdown;
