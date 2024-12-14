'use client'
import React, { useState } from 'react';
import { LOGIN_MUTATION, SEARCH_PATIENT } from '@/graphql/query';
import { useUserActions } from '@/store/userStore';
import { useMutation } from '@apollo/client';
import { Button, Checkbox, Col, Divider, Form, Row, Input, notification } from 'antd'
import { useRouter } from 'next/navigation';
import dashboardimg from '@/assets/images/logo-12.svg';
import Image from 'next/image';
// import PurchaseComponent from '@/components/PurchaseComponent';

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
            const permissions=["/dashboard", "/dashboard/intake-form", "/dashboard/summary","/dashboard/follow-up-form", "/dashboard/update-password"]
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
      <div className='flex sm:flex md:hidden lg:hidden xl:hidden justify-center items-start'>
      <Image src={dashboardimg} width={300} height={200}  alt='Iconix' className='block sm:block md:hidden lg:hidden xl:hidden max-w-[300px] w-[250px]' />
      </div>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">Sign In</div>
      {/* <PurchaseComponent /> */}
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
              <span
                className="!underline"
                onClick={() => setIsForget(true)}
              >
                Forget Password
              </span>
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