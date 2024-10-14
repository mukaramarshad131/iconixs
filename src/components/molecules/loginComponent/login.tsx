'use client'
import React, { useState } from 'react';
import { LOGIN_MUTATION, SEARCH_PATIENT } from '@/graphql/query';
import { useUserActions } from '@/store/userStore';
import { useMutation } from '@apollo/client';
import { Button, Checkbox, Col, Divider, Form, Row, Input, notification } from 'antd'
import { useRouter } from 'next/navigation';

const Login = ({setIsLogin, setIsForget}:{setIsLogin:(value:boolean)=>void, setIsForget:(value:boolean)=>void}) => {
      const { setUserInfo, setUserPermissions} = useUserActions();
      const [isLoading, setIsLoading] = useState(false)
      const router = useRouter();
      const handleFinish = async (values:any) => {
        setIsLoading(true)
          try {
            const logIn = {email:values.email, password:values.password}
            const logInRes = await fetch("api/login", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(logIn),
            });
            const response = await logInRes.json();
            console.log(response,logInRes.status)
            if(!logInRes.ok){
              notification.error({message:response.message,duration:3})
              setIsLoading(false)
              return;
            }
            const permissions=["/dashboard", "/dashboard/intake-form", "/dashboard/follow-up-form", "/dashboard/summary", "/dashboard/update-password"]
            setUserInfo(response.user);
            setUserPermissions(permissions);
            router.push('/dashboard')
            setIsLoading(false)
          } catch (error:any) {
            console.log(error.message)
            setIsLoading(false)
            throw error;
          }
          }
  return (
    <section className='px-[16px] lg:px-[64px]'>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">Sign In</div>
      <Form
        name="login"
        size="large"
        onFinish={handleFinish}
      >
        <Form.Item
          name="email"
          rules={[{ type: 'email', required: true, message: 'Email is required.' }]}
        >
          <Input placeholder='Please enter Email' />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Password is required."}]}
        >
          <Input.Password type="password" placeholder="Please enter Password" />
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>Remember me</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} className="text-right">
              <button
                className="!underline"
                onClick={() => setIsForget(true)}
              >
                Forget Password
              </button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full !bg-[#0c2345]" loading={isLoading}>
            Log In
          </Button>
        </Form.Item>
        <Divider className="!text-xs">
          <div onClick={() => setIsLogin(false)}>
            <Button className="w-full !text-sm" >Sign Up</Button>
          </div>
        </Divider>
      </Form>
    </section>
  )
}

export default Login