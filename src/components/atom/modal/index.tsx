import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';

const CustomModal = (props: { isViewModal: boolean, medicationId: string, setIsViewModal: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if(props.isViewModal) {
      showModal();
    }
  }, [props.isViewModal])

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    props.setIsViewModal(false);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    props.setIsViewModal(false);
  };

  return (
    <>
      <Modal title="Basic Modal" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <p>Some contents... {props?.medicationId}</p>
        <p>Some contents...</p>
        <p>Some contents...</p>
      </Modal>
    </>
  );
};

export default CustomModal;