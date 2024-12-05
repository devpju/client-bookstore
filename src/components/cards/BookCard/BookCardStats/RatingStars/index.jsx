import StarIcon from '@/assets/icons/star.svg?react';

const RatingStars = ({ rating, starSize = 3 }) => {
  const fullStars = Math.floor(rating);
  const emptyStars = 5 - fullStars;

  return (
    <div className='flex items-center justify-center'>
      {Array.from({ length: fullStars }).map((_, index) => (
        <span key={index} className='text-[#f7d310]'>
          <StarIcon className={`size-${starSize}`} />
        </span>
      ))}
      {Array.from({ length: emptyStars }).map((_, index) => (
        <span key={index + fullStars} className='text-gray-300'>
          <StarIcon className={`size-${starSize}`} />
        </span>
      ))}
    </div>
  );
};

export default RatingStars;
