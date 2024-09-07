'use client'
import IconButton from '@/components/atom/IconButton';
import { Divider, MenuProps } from 'antd';
import Dropdown, { DropdownProps } from 'antd/es/dropdown/dropdown';
import avatar from '@/assets/images/avatar.png'
import React from 'react';
import Image from 'next/image';
import { useUserActions, useUserInfo } from '@/store/userStore';
import Link from 'next/link';


export default function AccountDropdown() {
  const { clearUserInfoAndToken} = useUserActions();
  const {first_name, email} = useUserInfo();
  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };
  const contentStyle: React.CSSProperties = {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 8,
    boxShadow: "rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px"
  };
  const dropdownRender: DropdownProps['dropdownRender'] = (menu) => (
    <div style={contentStyle}>
      <div className="flex flex-col items-start p-4">
        <div>{first_name||''}</div>
        <div className="text-gray">{email||''}</div>
      </div>
      <Divider style={{ margin: 0 }} />
      {React.cloneElement(menu as React.ReactElement, { style: menuStyle })}
    </div>
  );

  const items: MenuProps['items'] = [
    { label: <Link href={'/dashboard'} onClick={()=>clearUserInfoAndToken()}>Dashboard</Link>,
     key: '1' },
    { type: 'divider' },
    {
      label: <Link href={'/'} className="font-bold text-red-600" onClick={()=>clearUserInfoAndToken()}>Logout</Link>,
      key: '3',
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} dropdownRender={dropdownRender}>
      <IconButton className="h-10 w-12 transform-none px-0 hover:scale-105">
        <Image className="h-8 w-10 rounded-full" src={avatar} alt="" />
      </IconButton>
    </Dropdown>
  );
}
