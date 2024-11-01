'use client'
import { useSidebarBtn } from '@/hook';
import React, { useEffect, useState } from 'react';
import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import { Button } from 'antd'

const Sidebarbtn = () => {
    const {collapsed, setCollapsed} =useSidebarBtn();

    useEffect(() => {
      const handleResize = () => {
        setCollapsed(window?.innerWidth < 768);
      };
  
      // Attach event listener
      window.addEventListener('resize', handleResize);
  
      // Initial check when component mounts
      handleResize();
  
      // Clean up event listener on component unmount
      return () => window.removeEventListener('resize', handleResize);
    }, []);
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