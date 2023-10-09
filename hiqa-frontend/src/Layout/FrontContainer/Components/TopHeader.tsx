import React, { memo, useEffect, useState } from 'react';
import Link from 'next/link';

import EligibilityPage from '../../Home/Components/EligibilityPage';

import Modal from '@/components/Default/Modal';
import { SETTINGS_DATA } from '@/types/interfaces';
import { useApp } from '@/components/App';
import { Button } from 'react-bootstrap';

const TopHeader = (props: { personalData: SETTINGS_DATA }) => {
  // eslint-disable-next-line no-unsafe-optional-chaining
  const { youtube_url, facebook_url, twitter_url, instagram_url, linkedin_url } = props?.personalData;
  const { state } = useApp();
  const [show, setShow] = useState<boolean>(false);

  useEffect(() => {
    handleOpen();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [state.user]);
  const closeModal = () => {
    setShow(false);
  };
  const handleOpen = () => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 1000);
    return () => clearTimeout(timer);
  };

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
                      <Button className="btn signInBtns d-flex align-items-center gap-2" onClick={() => setShow(true)}>
                        <div className="txt d-none d-sm-block">Check Eligibility</div>
                      </Button>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        className="course_modal"
        title="Eligibility"
        id="Eligibility Page"
        size="lg"
        show={show}
        onClose={() => closeModal()}
      >
        {state.user ? <img src="assets/img/popup/2.png" alt="contact-bg-an-01" /> : <EligibilityPage />}
      </Modal>
    </>
  );
};

export default memo(TopHeader);
