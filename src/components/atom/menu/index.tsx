'use client'
import { useSidebarItmes } from '@/hook';
import { Menu } from 'antd'
import React from 'react'

const SidebarMenu = () => {
    const items = useSidebarItmes();
  return (
    <Menu
        mode="inline"
        className="!border-e-0"
        defaultSelectedKeys={["4"]}
        items={items}
        suppressHydrationWarning
      />
  )
}

export default SidebarMenu