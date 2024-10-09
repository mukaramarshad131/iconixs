'use client'
import React, { useState } from 'react';
import { SEARCH_USERS, UPDATE_PATIENT } from '@/graphql/query';
import { useMutation, useLazyQuery } from '@apollo/client';
import { Button, Divider, Form, Input, notification } from 'antd'
import axios from "axios";



const ResetForm = ({setIsForget}:{setIsForget:(value:boolean)=>void}) => {
    const [loading, setLoading] = useState(false);
      const [ mutateFunction ] = useMutation(UPDATE_PATIENT);
      const [runQuery] = useLazyQuery(SEARCH_USERS);
    
      function genPassword() {
        const chars = '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const passwordLength = 12;
        let password = "";
     for (let i = 0; i <= passwordLength; i++) {
       const randomNumber = Math.floor(Math.random() * chars.length);
       password += chars.substring(randomNumber, randomNumber +1);
      }
      return password;
     }
      const handleForgetPassword = async (values:any) => {
        const password = genPassword();
        const payload = {
          ...values,
          password
        }
        console.log('MAK', payload);
        try {      
          setLoading(true)
         const response:any = await axios.post("api/reset-password", payload, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          console.log(response)
          if(response.status===200){
            notification.success({
              message: response.data.message,
              duration: 3,
            });
          }
          setLoading(false)
          setIsForget(false);
        } catch (error:any) {
          console.log(error)
          notification.error({
            message: error.response.data.message,
            duration: 3,
          });
          setLoading(false);
          setIsForget(false);
        }
      }
  return (
    <section className='px-[16px] lg:px-[64px]'>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">Reset Password</div>
      <Form
        name="forget"
        size="large"
        onFinish={handleForgetPassword}
      >
        <Form.Item
          name="email"
          rules={[{ type: 'email', required: true, message: 'Email is required.' }]}
        >
          <Input placeholder='Please enter Email' />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full !bg-[#0c2345]" loading={loading}>
          Send Email
          </Button>
        </Form.Item>
        <Divider className="!text-xs">
          <div onClick={() => setIsForget(false)}>
            <Button className="w-full !text-sm">Sign In</Button>
          </div>
        </Divider>
      </Form>
    </section>
  )
}

export default ResetForm