import Slider from 'react-slick';
import { BookCard } from '../cards/BookCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { ArrowLeft, ArrowRight } from 'lucide-react';

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} !z-20 !flex !size-8 !items-center !justify-center !rounded-full !bg-primary`}
      style={{ ...style }}
      onClick={onClick}
    >
      <ArrowRight className='size-5 text-white' />
    </button>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <button
      className={`${className} !z-20 !flex !size-8 !items-center !justify-center !rounded-full !bg-primary`}
      style={{ ...style }}
      onClick={onClick}
    >
      <ArrowLeft className='size-5 text-white' />
    </button>
  );
}

const BooksCarousel = ({ books }) => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    infinite: true,
    autoplay: true,
    pauseOnFocus: true,
    nextArrow: <SampleNextArrow className='!z-20' />,
    prevArrow: <SamplePrevArrow className='!z-20' />,
    appendDots: (dots) => (
      <div style={{ bottom: '-30px' }}>
        <ul> {dots} </ul>
      </div>
    ),
    customPaging: () => <div className={`h-1 w-5 rounded-full bg-gray-400`} />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };
  return (
    <div className='slider-container'>
      <Slider {...settings}>
        {books.map((book) => (
          <div key={book.id} className=''>
            <BookCard book={book} />
          </div>
        ))}
      </Slider>
    </div>
  );
};
export default BooksCarousel;
