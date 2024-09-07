'use client'
import { useSidebarBtn } from '@/hook';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'

const Sidebarbtn = () => {
    const {collapsed, setCollapsed} =useSidebarBtn();
  return (
    <Button
            type="text"
            icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
            onClick={() => setCollapsed(!collapsed)}
            style={{
              fontSize: "16px",
              width: 64,
              height: 64,
            }}
          />
  )
}

export default Sidebarbtn