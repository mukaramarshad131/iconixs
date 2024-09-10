'use client'
// import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Card, Typography, Space } from 'antd';
import Table from 'antd/es/table';
import {  GET_MEDICATION_LIST } from '@/graphql/query';
import { useUserInfo } from '@/store/userStore';
// import Link from "next/link";
// import {  Modal } from 'antd';
import dayjs from "dayjs";
import CustomModal from '@/components/atom/modal';
import React, { useState } from 'react';


export default function Medication() {
  const [isViewModal, setIsViewModal] = useState(false)
  const [medicationId, setMedicationId] = useState('')
  const { id } = useUserInfo();
  const { data: medicationListing,loading } = useQuery(GET_MEDICATION_LIST, {
    variables: {
      patient_id: id,
      offset: 0,
    },
  });


const showModal = (payload:any) => {
  setMedicationId(payload.id);
  setIsViewModal(true);
};


  const columns = [
    {
      title: 'Id',
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
      title: 'Directions',
      dataIndex: 'directions',
      key: 'directions',
    },
    { 
      title: 'Dosage',
      dataIndex: 'dosage',
      key: 'dosage',
      render: (text:any) => <span>{text}</span>,
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
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
    <Card className="flex-col">
      <div className="self-start">
        <Typography.Title level={5}>Medication</Typography.Title>
      </div>
      <main className="">
          <Table columns={columns} dataSource={medicationListing?.medications?.map((item:any, idx:number)=>({key:idx, ...item})) ?? []} scroll={{x: "700px"}} loading={loading}/>
      </main>
      <CustomModal isViewModal={isViewModal} medicationId= {medicationId} setIsViewModal= {setIsViewModal} />
    </Card>
  );
}
