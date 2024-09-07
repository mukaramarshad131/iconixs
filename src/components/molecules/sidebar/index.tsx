"use client";
import { useSidebarBtn } from "@/hook";
import Sider from "antd/es/layout/Sider";
import Image from "next/image";
import logo from "@/assets/images/logo-12.svg";
import React from "react";
import MenuSkeleton from "@/skeleton/menuSkeleton";
import dynamic from "next/dynamic";
import { siderStyle } from "@/constant/constant";
const SidebarMenu = dynamic(() => import('@/components/atom/menu'), {
  ssr: false,
  loading:()=><MenuSkeleton/>,
});

const SideBar = () => {
  const { collapsed } = useSidebarBtn();

  return (
    <Sider
      className="!min-h-screen transition-all duration-200 ease-in-out z-[1101]"
      breakpoint="lg"
      collapsedWidth={80}
      collapsed={collapsed}
      style={siderStyle}
    >
      <div className="py-1 px-2">
        <Image src={logo} alt="Iconix" className="w-full h-20 transition-all duration-200 ease-in-out" priority/>
      </div>
      <SidebarMenu/>
    </Sider>
  );
};

export default SideBar;
