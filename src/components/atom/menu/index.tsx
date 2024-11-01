'use client'
import { useSidebarItmes } from '@/hook';
import { Menu } from 'antd'
import React from 'react'

interface SidebarMenuProps {
  handleMenuClick?: (event: any) => void; // Optional handler
}
const SidebarMenu: React.FC<SidebarMenuProps> = ({ handleMenuClick }) => {
    const items = useSidebarItmes();
  return (
    <Menu
        mode="inline"
        className="!border-e-0"
        defaultSelectedKeys={["0"]}
        theme="dark"
        items={items}
        onClick={handleMenuClick}
        suppressHydrationWarning
      />
  )
}

export default SidebarMenu