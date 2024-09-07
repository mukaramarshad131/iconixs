"use client";
import { Badge } from "antd";
import React from "react";

const Ribon = (data: any) => {
  return (
    <Badge.Ribbon
      text={data.discount}
      color="red"
      style={{ padding: 8 }}
      className="absolute top-[20px] z-10"
    />
  );
};

export default Ribon;
