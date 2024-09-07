"use client";
import { useState } from "react";
import Login from "./login";
import SignUp from "./signUp";

const LoginComponent = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  return <>
  {isLogin ? <Login setIsLogin={setIsLogin}/> 
  : <SignUp setIsLogin={setIsLogin}/>}
  </>;
};

export default LoginComponent;
