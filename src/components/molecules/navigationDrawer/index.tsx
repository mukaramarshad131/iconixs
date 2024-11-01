"use client";
import React, { useState, useEffect } from 'react';
import { useSidebarBtn } from '@/hook';
import { Drawer } from 'antd';
import MenuSkeleton from "@/skeleton/menuSkeleton";
import dynamic from "next/dynamic";

const SidebarMenu = dynamic(() => import('@/components/atom/menu'), {
    ssr: false,
    loading:()=><MenuSkeleton/>,
  });

const NavigationDrawer = () => {
    const {collapsed, setCollapsed} =useSidebarBtn();

  const onClose = () => {
    setCollapsed(!collapsed);
  };
  return (
    <>
      <Drawer 
        title="Basic Drawer"
        placement='top'
        closable={false}
        onClose={onClose}
        open={!collapsed}
        key='top'
      >
        <SidebarMenu handleMenuClick={onClose}/>
      </Drawer>
    </>
  );
};

export default NavigationDrawer;