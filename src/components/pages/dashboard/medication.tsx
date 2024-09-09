'use client'
import { useQuery } from '@apollo/client';
import { Card, Typography, Space } from 'antd';
import Table from 'antd/es/table';
import {  GET_MEDICATION_LIST } from '@/graphql/query';
import { useUserInfo } from '@/store/userStore';
import Link from "next/link";



export default function Medication() {
  const { id } = useUserInfo();
  const { data: medicationListing,loading } = useQuery(GET_MEDICATION_LIST, {
    variables: {
      patient_id: id,
      offset: 0,
    },
  });

console.log("medicationListing", medicationListing);


  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      key: 'id',
      width:150,
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text) => <span>{text}</span>,
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
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Start Date',
      dataIndex: 'start_date',
      key: 'start_date',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Link href="/appointments">Link</Link>
        </Space>
      ),
    },
    // {
    //   title: 'Action',
    //   key: 'action',
    //   render: () => (
    //     <Space size="middle">
    //       <a href={doxyUrl} target="blank">
    //         link
    //       </a>
    //     </Space>
    //   ),
    // },
  ];

  return (
    <Card className="flex-col">
      <header className="self-start">
        <Typography.Title level={5}>Medication</Typography.Title>
      </header>
      <main className="">
          <Table columns={columns} dataSource={medicationListing?.medications?.map((item:any, idx:number)=>({key:idx, ...item})) ?? []} scroll={{x: "700px"}} loading={loading}/>
      </main>
    </Card>
  );
}
