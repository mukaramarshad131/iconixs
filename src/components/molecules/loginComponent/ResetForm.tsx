'use client'
import React, { useState } from 'react';
import { SEARCH_USERS, UPDATE_PATIENT } from '@/graphql/query';
import { useMutation, useLazyQuery } from '@apollo/client';
import { Button, Divider, Form, Input, notification } from 'antd'
import { sendMail } from '@/lib/send-mail';



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
        setLoading(true);
        const response = await runQuery({ variables: { keywords: values.email } });
        if(response?.data?.users?.length > 0) {
            const user = response?.data?.users;
            const password = genPassword();
            const updatePayload = {
                input: {
                  id: user[0].id,
                  password
                },
              };
          const mailText = `<p>Hi <strong>${user[0].first_name}</strong></p>
            <p>Your password has been reset. You can now use the following password to log in to your account:</p>
            <p>New Password: <b>${password}<b></p>
            <p>For security reasons, we recommend logging in and changing your password immediately to something more personal and secure. You can do this by visiting your account settings.</p>
            <p>If you didn’t request this password reset, please contact us immediately.</p>
            <p><strong>Thank you,</strong></p>
            <p><strong>Iconix Support Team</strong></p>`;
          const response4 = await sendMail({
            sendTo: values.email,
            subject: ' Your New Password for Iconix',
            text: ``,
            html: mailText
          });
          if (response4?.messageId) {
            const {
                data: {
                  signUp
                },
              } = await mutateFunction({ variables: { ...updatePayload } });
              console.log('signUp: ', signUp);
            notification.success({
              message: 'Please Check your email for your new password. If not found, check your spam folder.',
              duration: 3,
            });
            setLoading(false);
            setIsForget(false);
          } else {
            setLoading(false);
            setIsForget(false);
            notification.error({
              message: "We couldn't process your request. Please try again later or contact support if the issue persists.",
              duration: 3,
            });
          }
        } else {
          setLoading(false);
          notification.error({
            message: 'Invalid Email',
            duration: 3,
          });
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