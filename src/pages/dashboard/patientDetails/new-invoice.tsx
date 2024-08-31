import { useQuery } from '@apollo/client';
import { Space, Typography } from 'antd';
import Table, { ColumnsType } from 'antd/es/table';

import Card from '@/components/card';
import Scrollbar from '@/components/scrollbar';
import { APPOINTMENTS_QUERY } from '@/graphql/query';
import { useUserInfo } from '@/store/userStore';

interface DataType {
  key?: string;
  id?: string;
  contact_type?: string;
  date?: string;
  location?: string;
  attendees?: any[];
  provider?: {
    full_name: string;
  };
  category?: string;
  price?: string;
  status?: string;
}

export default function NewInvoice() {
  const { id, firstName, lastName } = useUserInfo();
  const { data: appointmentListing } = useQuery(APPOINTMENTS_QUERY, {
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

  const doxyUrl = `https://openloophealth.doxy.me/iconix?username=${firstName}%20${lastName}%20Patient&autocheckin=false&pid=${id}`;

  return (
    <Card className="flex-col">
      <header className="self-start">
        <Typography.Title level={5}>New Appointments</Typography.Title>
      </header>
      <main className="w-full">
        <Scrollbar>
          <Table columns={columns} dataSource={appointmentListing?.appointments ?? []} />
        </Scrollbar>
      </main>
    </Card>
  );
}
