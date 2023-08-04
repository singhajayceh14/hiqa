import React, { memo } from 'react';
import Link from 'next/link';

import { SETTINGS_DATA } from '@/types/interfaces';

const TopHeader = (props: { personalData: SETTINGS_DATA }) => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { email, phone, youtube_url, facebook_url, twitter_url, instagram_url, linkedin_url } = props?.personalData;

  return (
    <>
      <div className="header-top second-header d-none d-md-block">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-4 col-md-4 d-none d-lg-block ">
              <div className="header-social">
                <span>
                  Follow us:-
                  <Link href={facebook_url ?? '#'} title="Facebook">
                    <i className="fab fa-facebook-f" />
                  </Link>
                  <Link href={instagram_url ?? '#'} title="Instagram">
                    <i className="fab fa-instagram" />
                  </Link>
                  <Link href={twitter_url ?? '#'} title="Twitter">
                    <i className="fab fa-twitter" />
                  </Link>
                  <Link href={linkedin_url ?? '#'} title="LinkedIn">
                    <i className="fab fa-linkedin-in" />
                  </Link>
                  <Link href={youtube_url ?? '#'} title="Youtube">
                    <i className="fab fa-youtube" />
                  </Link>
                </span>
              </div>
            </div>
            <div className="col-lg-8 col-md-8 d-none d-lg-block text-right">
              <div className="header-cta">
                <ul>
                  <li>
                    <div className="second-header-btn">
                      <Link className="btn signInBtns d-flex align-items-center gap-2" href="/contact">
                        <div className="txt d-none d-sm-block">Enquiry Now</div>
                      </Link>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(TopHeader);
