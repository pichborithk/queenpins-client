import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, EffectCoverflow } from 'swiper/modules';

import 'swiper/css';

import 'swiper/css/autoplay';
import 'swiper/css/effect-coverflow';

import images from '../assets/slide_images';

const Slider = () => {
  return (
    <Swiper
      spaceBetween={0}
      slidesPerView={3}
      centeredSlides={true}
      modules={[Autoplay, EffectCoverflow]}
      grabCursor={true}
      effect='coverflow'
      coverflowEffect={{
        rotate: 50,
        stretch: 0,
        depth: 100,
        modifier: 1,
        slideShadows: true,
      }}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      {images.map((img, index) => (
        <SwiperSlide key={index}>
          <img src={img} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
