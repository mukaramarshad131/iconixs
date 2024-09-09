'use client'
import { useQuery } from '@apollo/client';
import { Card, Typography, Space } from 'antd';
import Table from 'antd/es/table';
import {  GET_CAREPLAN_LIST } from '@/graphql/query';
import { useUserInfo } from '@/store/userStore';
import Link from "next/link";


export default function NewSummary() {
  const { id } = useUserInfo();
  const { data: appointmentListing,loading } = useQuery(GET_CAREPLAN_LIST, {
    variables: {
      patient_id: id,
      offset: 0,
    },
  });

console.log("appointmentListing", appointmentListing?.carePlans);


  const columns = [
    {
      title: 'Appointment Id',
      dataIndex: 'id',
      key: 'id',
      width:150,
      render: (text:any) => <span>{text.id}</span>,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text:any) => <span>{text.name}</span>,
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
      render: (text:any) => <span>{text.created_at}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <Link href="/appointments">Link</Link>
        </Space>
      ),
    },
    // {
    //   title: 'Provider',
    //   dataIndex: 'provider',
    //   key: 'provider',
    //   render: (text:any) => <span>{text.full_name}</span>,
    // },
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
        <Typography.Title level={5}>Care Plan</Typography.Title>
      </header>
      <main className="">
          <Table columns={columns} dataSource={appointmentListing?.carePlans?.map((item:any, idx:number)=>({key:idx, ...item})) ?? []} scroll={{x: "700px"}} loading={loading}/>
      </main>
    </Card>
  );
}
