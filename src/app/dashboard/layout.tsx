import { SidebarPorvider } from "@/hook";
import Loading from "@/components/atom/Loading/Loading";
import LayoutAside from "@/components/atom/layoutAside";
import SideBar from "@/components/molecules/sidebar";

const LayoutInner = ({ children }: any) => {
  return (
    <SidebarPorvider>
      <div className="!min-h-screen !max-w-screen overflow-x-hidden flex">
        <SideBar/>
        <LayoutAside>{children}</LayoutAside>
        </div>
      <Loading/>
    </SidebarPorvider>
  );
};

export default LayoutInner;
