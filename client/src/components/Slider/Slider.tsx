import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules'; // Import Navigation, Pagination, and Autoplay
import 'swiper/swiper-bundle.css'; // Ensure you're importing Swiper styles
import '../../styles.css'; // Custom styles

type SliderProps = {
    images: string[];
};

function ImageSlider({ images }: SliderProps) {
    const imagesUrl: string = 'http://127.0.0.1:8000/storage';

    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]} 
            navigation 
            pagination={{ clickable: false }} 
            autoplay={{ delay: 5000 }} 
            loop={true} 
            className='mySwiper rounded-md w-96 h-96 lg:w-[50rem] lg:h-[500px]'
            // style={{ width: '50rem', height: '500px'}} 
        >
            {images.map((img, index) => (
                <SwiperSlide key={index}>
                    <img
                        src={`${imagesUrl}/${img}`}
                        alt={`Image ${index + 1}`}
                        className='w-full h-full object-cover'
                    />
                </SwiperSlide>
            ))}
        </Swiper>
    );
}

export default ImageSlider;
