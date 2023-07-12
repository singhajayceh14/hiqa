import React, { useEffect } from 'react';

import styles from '@/styles/Components/Modal/Modal.module.scss';

interface PROPS {
  id: string;
  show: boolean;
  width?: string;
  title: string;
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
  outer?: boolean;
}

function Index(props: PROPS) {
  useEffect(() => {
    const leftModal = document.querySelector<HTMLDivElement>(`#${props.id}`);
    if (leftModal) {
      leftModal.style.zIndex = '100';
      if (props.show && props.width) {
        leftModal.style.width = props.width || '500px';
        leftModal.style.opacity = '1';
      } else {
        leftModal.style.width = '0px';
        leftModal.style.padding = '0';
        leftModal.style.opacity = '0';
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props.show]);

  const hideModal = () => {
    if (props?.onClose) props.onClose();
  };
  return (
    <div>
      {' '}
      <div className={`tableRight rightModal container`} id={props.id}>
        <div className="listSection bdrNone">
          <div className={styles.rightModalbody}>
            <h3>{props.title}</h3>
            <span onClick={hideModal}>
              <i role={'button'} className="fa fa-times text-danger" style={{ fontSize: '20px' }}></i>
            </span>
          </div>
          {props.children}
        </div>
      </div>
      <style>
        {/* {`
          .outer{
            padding:${!props.outer ? '0px' : '80px 30px 30px'};
          }
        `} */}
      </style>
    </div>
  );
}

export default Index;
