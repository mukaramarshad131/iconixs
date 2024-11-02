'use client'
import IconButton from '@/components/atom/IconButton';
import { Divider, MenuProps } from 'antd';
import Dropdown, { DropdownProps } from 'antd/es/dropdown/dropdown';
import React from 'react';
import { useUserActions, useUserInfo } from '@/store/userStore';
import Link from 'next/link';
import { DownOutlined } from '@ant-design/icons';
import { useRouter } from 'next/navigation';



export default function AccountDropdown() {
  const { clearUserInfoAndToken, setUserPermissions } = useUserActions();
  const router = useRouter()
  const {first_name = "", last_name="" ,email=""} = useUserInfo();
  const menuStyle: React.CSSProperties = {
    boxShadow: 'none',
  };
  const contentStyle: React.CSSProperties = {
    backgroundColor: 'rgb(255, 255, 255)',
    borderRadius: 8,
    boxShadow: "rgba(0, 0, 0, 0.08) 0px 6px 16px 0px, rgba(0, 0, 0, 0.12) 0px 3px 6px -4px, rgba(0, 0, 0, 0.05) 0px 9px 28px 8px"
  };
  const logout =async ()=>{
    clearUserInfoAndToken();
    const response = await fetch("/api/logout", { method: "GET" });
    if (response.ok) {
      // Redirect to the home page after successful logout
      setUserPermissions([]);
      window.location.href = "/";
    } else {
      console.error("Failed to log out");
    }
  }

  const dropdownRender: DropdownProps['dropdownRender'] = (menu) => (
    <div style={contentStyle}>
      <div className="flex flex-col items-start p-4">
        <div>{first_name||''} {last_name || ''}</div>
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
      label: <span  className="font-bold text-red-600" onClick={logout}>Logout</span>,
      key: '3',
    },
  ];

  return (
    <Dropdown menu={{ items }} trigger={['click']} dropdownRender={dropdownRender}>
      <IconButton className="h-10 transform-none text-sm">
        <div className='mr-1'>Current Patient</div>
        <DownOutlined className="text-sm" />
      </IconButton>
    </Dropdown>
  );
}
