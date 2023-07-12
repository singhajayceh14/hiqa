import React, { lazy } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import moment from 'moment';

import styles from '@/styles/Components/Container/Header.module.scss';
import { useCommonReducer } from '@/components/App/reducer';

import { useContainerContext } from '../context';

const Modal = lazy(() => import('@/components/Default/Modal'));

function Notification() {
  const { state, dispatch } = useContainerContext();
  const { state: notificationState } = useCommonReducer();

  const closeModal = (key: string) => {
    dispatch({ ...state, [key]: false });
  };
  return (
    <div>
      <Modal
        id={'Notifications' + '_modal'}
        title={'Notifications'}
        width="25%"
        show={state.showNotifications}
        outer={true}
        onClose={() => closeModal('showNotifications')}
      >
        <div className="container">
          {notificationState?.notifications?.length ? (
            <ListGroup className={styles.notificationList}>
              {notificationState?.notifications?.map((note: any, i: number) => (
                <ListGroup.Item key={i}>
                  {note.message} <strong>{moment(note.created_at).fromNow()}</strong>
                </ListGroup.Item>
              ))}
            </ListGroup>
          ) : (
            <p className="text-center">No Notifications Found</p>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default Notification;
