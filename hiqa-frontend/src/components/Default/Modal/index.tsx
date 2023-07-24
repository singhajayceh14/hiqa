import React from 'react';
import Modal from 'react-bootstrap/Modal';

interface PROPS {
  id: string;
  show: boolean;
  size: any;
  title: string;
  children: JSX.Element | JSX.Element[];
  onClose: () => void;
  outer?: boolean;
}

function Index(props: PROPS) {
  const hideModal = () => {
    if (props?.onClose) props.onClose();
  };
  return (
    <Modal
      id={props.id}
      size={props?.size ?? 'sm' }
      show={props.show}
      onHide={hideModal}
      backdrop="static"
      keyboard={false}
      centered
    >
      <Modal.Header closeButton>
        <Modal.Title>{props.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{props.children}</Modal.Body>
    </Modal>
  );
}

export default Index;
