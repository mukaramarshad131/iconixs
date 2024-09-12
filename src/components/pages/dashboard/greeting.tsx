"use client";
import { useUserInfo } from "@/store/userStore";
import React, { useEffect, useState } from "react";

const Greeting = () => {
  const [name, setName] = useState("");
  const user = useUserInfo();
  useEffect(() => {
    user && user.first_name && setName(user.first_name);
  }, [user]);
  return (
    <div className="my-4 text-lg font-semibold md:text-xl">
      Welcome back 👋 <br />
      <span>{name}</span>
    </div>
  );
};

export default Greeting;
