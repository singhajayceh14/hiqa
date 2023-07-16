import { memo } from 'react';

import { SECTION_DATA } from '@/types/interfaces';
interface SECTION_PROPS {
  title: string;
  url: string;
  iconName: string;
}

const SectionPage = (props: SECTION_PROPS[]) => {
  const { front_data } = props;
  return (
    <>
      {front_data.map((front: SECTION_DATA, index: number) => (
        <section key={front.id} id="about" className="about">
          <div className="container" data-aos="fade-up">
            <div className="row">
              <div
                className={
                  index == 0 ? 'col-lg-6 order-1 order-lg-2' : 'col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content'
                }
                data-aos="fade-left"
                data-aos-delay="100"
              >
                <img src={front.image} className="img-fluid" alt="" />
              </div>
              <div 
                className={
                  index == 0 ? 'col-lg-6 pt-4 pt-lg-0 order-2 order-lg-1 content' : 'col-lg-6 order-1 order-lg-2 content'
                }  
                data-aos="fade-left"
                data-aos-delay="100"
                >
                <h3>{front.title}</h3>
                <div dangerouslySetInnerHTML={{ __html: front.description }} />
              </div>
            </div>
          </div>
        </section>
      ))}
    </>
  );
};
export default memo(SectionPage);
