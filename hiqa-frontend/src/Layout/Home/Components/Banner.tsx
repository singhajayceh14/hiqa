import { memo } from 'react';
import Carousel from 'react-bootstrap/Carousel';

import { BANNER } from '@/types/interfaces';

const Banner = (props: BANNER[]) => {
  const { banners } = props;
  return (
    <Carousel>
      {banners.map((banner: BANNER) => (
        <Carousel.Item key={banner.id} interval={5000} style={{height:'670px'}}>
          <img src={banner.image} alt="First slide" />
        </Carousel.Item>
      ))}
    </Carousel>
  );
};
export default memo(Banner);
