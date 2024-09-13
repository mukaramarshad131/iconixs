"use client";
import { useState } from "react";
import Login from "./login";
import SignUp from "./signUp";
import ResetForm from "./ResetForm";

const LoginComponent = () => {
  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [isForget, setIsForget] = useState<boolean>(false);
  return <>
  { isLogin ? (isForget ? <ResetForm setIsForget={setIsForget} /> : <Login setIsLogin={setIsLogin} setIsForget={setIsForget}/>)
  : <SignUp setIsLogin={setIsLogin}/>}
  </>;
};

export default LoginComponent;
