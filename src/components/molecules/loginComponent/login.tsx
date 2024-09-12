'use client'
import React, { useState } from 'react';
import { LOGIN_MUTATION, SEARCH_USERS } from '@/graphql/query';
import { useUserActions } from '@/store/userStore';
import { useMutation, useLazyQuery } from '@apollo/client';
import { Button, Checkbox, Col, Divider, Form, Row, Input, notification } from 'antd'
import { useRouter } from 'next/navigation';
import {  Modal } from 'antd';
import { sendMail } from '@/lib/send-mail';

const Login = ({setIsLogin}:{setIsLogin:(value:boolean)=>void}) => {
      const [ mutateFunction, { loading } ] = useMutation(LOGIN_MUTATION);
      // const [ inviteEmail, { loading:inviteLoding } ] = useMutation(UPDATE_PATIENT);
      const [runQuery, {loading: fetching}] = useLazyQuery(SEARCH_USERS);
      const { setUserToken, setUserInfo, setUserPermissions} = useUserActions();
      const [isModalOpen, setIsModalOpen] = useState(false);
      const router = useRouter();
      const showModal = () => {
        setIsModalOpen(true);
        
      };
    
      const handleOk = () => {
        setIsModalOpen(false);
      };
    
      const handleCancel = () => {
        setIsModalOpen(false);
      };
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
        const response = await runQuery({ variables: { keywords: values.email } });
        if(response?.data?.users?.length > 0) {
          // const payload = {
          //   input: {
          //     id: response?.data?.users[0].id,
          //     resend_welcome: true
          //   },
          // };
          const message = `${genPassword()}`
          const mailText = `\n  Email: ${values.email}\nMessage: ${message}`;
          const response4 = await sendMail({
            sendTo: values.email,
            subject: 'New Contact Us Form',
            text: mailText,
          });
          if (response4?.messageId) {
            notification.success({
              message: 'Application Submitted Successfully. Invite sent to an Email',
              duration: 3,
            });
          } else {
            notification.error({
              message: 'Failed To send application.',
              duration: 3,
            });
          }
          // await inviteEmail({ variables: { ...payload } });
          // notification.success({
          //   message: 'Invite sent to an Email',
          //   duration: 3,
          // });
          // handleCancel();
        } else {
          notification.error({
            message: 'Invalid Email',
            duration: 3,
          });
        }
      }
      const handleFinish = async (values:any) => {
          const login = {
            email: values.username,
            password:values.password,
            tokenAPI: true,
            multipleAPI: true,
            dietitian_id: '1322376',
          };
          const {data: { signIn: signUser }} = await mutateFunction({ variables: { ...login } });
          if (signUser?.messages?.length > 0) {
            notification.error({
              message: signUser.messages[0].message,
              duration: 3,
            });
            return 0;
          }
          const accessToken = '387f3e57-9c4b-46a3-bd66-cbac6a60aad2';
          const permissions=["/dashboard", "/dashboard/intake-form", "/dashboard/summary"]

          setUserToken(accessToken);
          setUserInfo(signUser.user);
          setUserPermissions(permissions);
          router.push('/dashboard')
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
          name="username"
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
                onClick={showModal}
              >
                Forget Password
              </button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full !bg-[#0c2345]" loading={loading}>
            Log In
          </Button>
        </Form.Item>
        <Divider className="!text-xs">
          <div onClick={() => setIsLogin(false)}>
            <Button className="w-full !text-sm">Sign Up</Button>
          </div>
        </Divider>
      </Form>
      <Modal title="Reset Password" footer={null} open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
      <Form
        name="forgetPassword"
        size="large"
        onFinish={handleForgetPassword}
        style={{ maxWidth: 600 }}
    
  >
    <Form.Item
          name="email"
          rules={[{ required: true, message: 'Email is required.', type: 'email' }]}
        >
          <Input type="text" placeholder='Please enter Email' />
        </Form.Item>
    <Form.Item style={{textAlign: 'center'}}>
          <Button type="primary" htmlType="submit" className="!bg-[#0c2345]" loading={fetching}>
            Submit
          </Button>
        </Form.Item>
  </Form>
      </Modal>
    </section>
  )
}

export default Login