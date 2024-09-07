import React from "react";

const MenuSkeleton = () => {
  return (
    <div className="animate-pulse p-2 w-full z-10 pulseAnimation" style={{display:'flex',flexDirection:"column",gap:10}}>
      <div className="rounded" style={{ background: "#e2e8f0",height:30 }}></div>
      <div className="rounded" style={{ background: "#e2e8f0",height:30 }}></div>
      <div className="rounded" style={{ background: "#e2e8f0",height:30 }}></div>
    </div>
  );
};

export default MenuSkeleton;
