'use client'
import React, { useState } from 'react';
import { useQuery } from '@apollo/client';
import { Card, Space} from 'antd';
import Table from 'antd/es/table';
import { INTAKE_FORM_QUERY } from '@/graphql/query';
import { useUserInfo } from '@/store/userStore';
import {  Modal } from 'antd';
import dayjs from "dayjs";


export default function IntakeListing() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRow, setCurrentRow] = useState<any>({
    name: '',
    created_at: '',
    form_answers: []
  });

  const showModal = (payload:any) => {
    setIsModalOpen(true);
    setCurrentRow(payload);
    console.log(payload);
    
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const { id } = useUserInfo();
  const { data: intakeFormData, loading } = useQuery(INTAKE_FORM_QUERY, {
    variables: {
      custom_module_form_id: "1524146",
      user_id: id,
      filler_id: id,
    },
  });
  console.log('intakeFormData: ', intakeFormData?.formAnswerGroups);
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
      render: (text:any) => <span>{text}</span>,
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
      render: (_:any, record:any) => (
        <Space size="middle">
          <a target="blank" onClick={() => showModal(record)} >
            View Detail
          </a>
        </Space>
      ),
    },
  ];
  return (
    <Card className="flex-col" bodyStyle={{padding: '15px 24px' }}>
      <header className=" mb-5">
      <h1 className=" text-lg font-semibold text-[#0092B3] mb-5">
      Intake Listing
      </h1>
      </header>
      <main className="">
          <Table columns={columns} dataSource={intakeFormData?.formAnswerGroups?.map((item:any, idx:number)=>({key:idx, ...item})) ?? []} scroll={{x: "700px"}} loading={loading}/>
      </main>
      <Modal title={currentRow.name} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
        <div className='rowHTML' dangerouslySetInnerHTML={{__html: currentRow?.form_answers[2]?.displayed_answer }} />
      </Modal>
    </Card>
  );
}
