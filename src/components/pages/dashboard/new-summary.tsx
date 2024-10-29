'use client'
import { useQuery } from '@apollo/client';
import { Card, Space } from 'antd';
import Table from 'antd/es/table';
import {  GET_CAREPLAN_LIST } from '@/graphql/query';
import { useUserInfo } from '@/store/userStore';
import React, { useState } from 'react';
import dayjs from "dayjs";
import CarePlanModal from '@/components/atom/carePlanModal';


export default function NewSummary() {
  const [isViewModal, setIsViewModal] = useState(false)
  const [cardPlanId, setCardPlanId] = useState('')

  const showModal = (payload:any) => {
    setIsViewModal(true);
    setCardPlanId(payload.id);
  };

  const { id } = useUserInfo();
  const { data: appointmentListing,loading } = useQuery(GET_CAREPLAN_LIST, {
    variables: {
      patient_id: id,
      offset: 0,
    },
  });

  const columns = [
    {
      title: 'Appointment Id',
      dataIndex: 'id',
      key: 'id',
      width:150,
      render: (text:any) => <span>{text}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text:any) => <span>{text}</span>,
    },
    {
      title: 'description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Date',
      dataIndex: 'created_at',
      key: 'created_at',
      render: (text:any) => <span>{dayjs(text).format("DD/MM/YYYY")}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_:any,record:any) => (
        <Space size="middle">
          <a target="blank"  onClick={() => {showModal(record)}}>
            View Detail
          </a>
        </Space>
      ),
    },
  ];

  return (
    <Card className="padding-12 cardBody-0 flex-col" bodyStyle={{padding: '15px 24px' }}>
      <header className="self-start">
      <h1 className=" text-lg font-semibold text-[#0092B3] mb-5">
      Care Plan
      </h1>
      </header>
      <main className="">
          <Table columns={columns} dataSource={appointmentListing?.carePlans?.map((item:any, idx:number)=>({key:idx, ...item})) ?? []} scroll={{x: "700px"}} loading={loading}/>
      </main>
      {isViewModal && <CarePlanModal isViewModal={isViewModal} setIsViewModal={setIsViewModal} cardPlanId={cardPlanId} /> }
    </Card>
  );
}
