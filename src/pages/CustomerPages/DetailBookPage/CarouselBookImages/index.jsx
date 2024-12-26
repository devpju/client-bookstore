import Slider from 'react-slick';
function CarouselBookImages({ images }) {
  const settings = {
    customPaging: function (i) {
      return (
        <a>
          <img src={images[i]} alt={`Thumbnail ${i + 1}`} />
        </a>
      );
    },
    dots: true,
    dotsClass: 'slick-dots slick-thumb',
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false
  };

  return (
    <div className='slider-container book-images-slider pr-20'>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`Slide ${index + 1}`}
              className='w-[calc(100%-180px)] bg-contain'
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default CarouselBookImages;
