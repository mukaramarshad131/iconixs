'use client'
import { useQuery } from '@apollo/client';
import { Card, Space} from 'antd';
import Table, { ColumnsType } from 'antd/es/table';
import { APPOINTMENTS_QUERY } from '@/graphql/query';
import { useUserInfo } from '@/store/userStore';
import { DataType } from '@/types/types';


export default function NewInvoice() {
  const { id, first_name, last_name } = useUserInfo();
  const { data: appointmentListing,loading } = useQuery(APPOINTMENTS_QUERY, {
    variables: {
      user_id: id,
      filter: 'all',
      order_by: 'DATE_DESC',
      should_paginate: false,
      is_active: true,
      with_all_statuses: true,
    },
  });
  const columns: ColumnsType<DataType> = [
    {
      title: 'Appointment Id',
      dataIndex: 'id',
      key: 'id',
      width:150,
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Attendees',
      dataIndex: 'attendees',
      key: 'attendees',
      render: (text) => <span>{text[0].full_name}</span>,
    },
    {
      title: 'Contact Type',
      dataIndex: 'contact_type',
      key: 'contact_type',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text) => <span>{text}</span>,
    },
    {
      title: 'Provider',
      dataIndex: 'provider',
      key: 'provider',
      render: (text) => <span>{text.full_name}</span>,
    },
    {
      title: 'Action',
      key: 'action',
      render: () => (
        <Space size="middle">
          <a href={doxyUrl} target="blank">
            link
          </a>
        </Space>
      ),
    },
  ];

  const doxyUrl = process.env.OPEN_LOOP_DOXY_LINK+`?username=${first_name}%20${last_name}%20Patient&autocheckin=false&pid=${id}`;

  return (
    <Card className="flex-col">
      <header className="text-center mb-5">
      <h1 className="p-5 text-center text-3xl font-semibold text-[#0092B3] mb-5">
      New Appointments
      </h1>
      </header>
      <main className="">
          <Table columns={columns} dataSource={appointmentListing?.appointments.map((item:any, idx:number)=>({key:idx, ...item})) ?? []} scroll={{x: "700px"}} loading={loading}/>
      </main>
    </Card>
  );
}
