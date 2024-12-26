import { useState } from 'react';
import StarIcon from '@/assets/icons/star.svg?react'; // Import icon sao

const getRatingDescription = (rating) => {
  switch (rating) {
    case 1:
      return 'Rất tệ';
    case 2:
      return 'Tệ';
    case 3:
      return 'Bình thường';
    case 4:
      return 'Tốt';
    case 5:
      return 'Rất tốt';
    default:
      return '';
  }
};

const SelectRating = ({ onChange, starSize = 5, value = 0 }) => {
  const [selectedRating, setSelectedRating] = useState(value); // Lưu rating đã chọn

  const handleStarClick = (rating) => {
    setSelectedRating(rating); // Cập nhật rating khi click
    onChange(rating); // Trả về rating đã chọn cho parent component
  };

  return (
    <div className='flex items-center'>
      {Array.from({ length: 5 }).map((_, index) => {
        const rating = index + 1;
        const isFilled = rating <= selectedRating; // Kiểm tra xem sao này có được chọn không
        return (
          <span
            key={index}
            onClick={() => handleStarClick(rating)} // Xử lý khi người dùng click vào sao
            className={`cursor-pointer ${isFilled ? 'text-[#f7d310]' : 'text-gray-300'}`} // Áp dụng màu sắc tương ứng
          >
            <StarIcon className={`size-${starSize}`} />
          </span>
        );
      })}
      <p className='ml-2'>{getRatingDescription(selectedRating)}</p>{' '}
      {/* Hiển thị mô tả đánh giá */}
    </div>
  );
};

export default SelectRating;
