import React, { useEffect, useState } from 'react';
import { Modal } from 'antd';
import { useQuery } from '@apollo/client';
import {  GET_CARE_PLAN } from '@/graphql/query';

const CarePlanModal = (props: { isViewModal: boolean, cardPlanId: string, setIsViewModal: any }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data: medicationListing } = useQuery(GET_CARE_PLAN, {
    variables: {
      id: props.cardPlanId,
    },
  });
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
      <Modal title="Care Plan" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <h3>{medicationListing?.carePlan?.name}</h3>
        <p>{medicationListing?.carePlan?.description}</p>
      </Modal>
    </>
  );
};

export default CarePlanModal;