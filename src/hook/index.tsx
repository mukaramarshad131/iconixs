"use client";
import { capitalizeFirstLetter } from "@/components/funcitons";
import { useUserPermissions } from "@/store/userStore";
import Link from "next/link";
import { createContext, ReactNode, useContext, useState } from "react";

export const sidebarBtn = createContext<any>({});
export const useSidebarBtn = () => {
  return useContext(sidebarBtn);
};
export const SidebarPorvider = ({ children }: { children: ReactNode }) => {
  const [collapsed, setCollapsed] = useState(false);
  return (
    <sidebarBtn.Provider value={{ collapsed, setCollapsed }}>
      {children}
    </sidebarBtn.Provider>
  );
};
export const useSidebarItmes = () => {
  const permissions = useUserPermissions();

  return permissions?.filter((key:string)=>(key !=='/dashboard/create-invoice'))?.map((item: string, idx: number) => {
    const title =item === "/dashboard" ? "dashboard" : item.split("/")[2]

    return{
    key: (idx + 1).toString(),
    icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentcolor" width='10px' height='10px'><path d="M256 512A256 256 0 1 0 256 0a256 256 0 1 0 0 512zm0-352a96 96 0 1 1 0 192 96 96 0 1 1 0-192z"/></svg>,
    label: (
      <Link href={item} >
        {capitalizeFirstLetter(title)}
      </Link>
    ),
  }});
};
