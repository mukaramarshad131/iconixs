'use client'
import {Spin} from "antd";
import { usePathname,} from "next/navigation";
import { useEffect, useState} from "react";

const Loading = () => {
  const [isLoader, setIsLoader] =useState(false);
  const pathname = usePathname();
  useEffect(()=>{if(!isLoader){
    setIsLoader(true)
    setTimeout(()=>setIsLoader(false), 2000)
    //eslint-disable-next-line
  }},[pathname])
  return <Spin spinning={isLoader} size="large" fullscreen style={{position:"fixed",zIndex:10000}} />;
};

export default Loading;
