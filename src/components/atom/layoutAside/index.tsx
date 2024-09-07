'use client'
import React, { ReactNode } from "react";
import { useSidebarBtn } from "@/hook";
import Sidebarbtn from "@/components/molecules/sidebar/sidebarbtn";
import AccountDropdown from "@/components/molecules/accountDropdown";

const LayoutAside = ({ children }: { children: ReactNode }) => {
    const { collapsed } = useSidebarBtn();
  return (
    <aside
      className="w-full overflow-x-hidden overflow-y-auto transition-all duration-200 ease-in-out"
      style={{ marginInlineStart: collapsed?80:200 }}
    >
      <div
        id="header"
        className="bg-[#fff] head flex items-center !p-[5px] h-[60px]"
        style={{boxShadow:"3px 3px 5px #f0f0f0"}}
      >
        <Sidebarbtn />
        <div className="ml-auto">
          <AccountDropdown />
        </div>
      </div>
      <div className="p-6 min-h-[360px] bg-[#fff] rounded-lg mt-[60px]">
        {children}
      </div>
    </aside>
  );
};

export default LayoutAside;
