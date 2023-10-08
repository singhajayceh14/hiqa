import React, { memo, useCallback, useEffect, useState } from 'react';

import { useRequest } from '@/components/App';
import { REQUEST, GALLERY_DATA } from '@/types/interfaces';

function Index() {
  const [current, setCurrent] = useState([]);
  const { loading, request } = useRequest();

  const initialize = useCallback(async () => {
    const req: any = (await request('getGallery')) as REQUEST;
    if (req?.status) {
      setCurrent(req?.data);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    initialize();
  }, [initialize]);

  return (
    <>
      <section id="work" className="pt-50 pb-50">
        <div className="container">
          <div className="portfolio ">
            <div className="grid col3 row wow fadeInUp  animated" data-animation="fadeInUp" data-delay=".4s">
              <h2>Gallery</h2>
              {current.length &&
                current.map((item: GALLERY_DATA, Index) => (
                  <div className="grid-item financial col-4" key={Index}>
                    <img src={item.image} alt="img" className="img" />
                  </div>
                ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default memo(Index);
