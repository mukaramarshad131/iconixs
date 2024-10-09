'use client'
import React, { useState } from 'react';
import { useUserInfo } from '@/store/userStore';
import { Button, Col, Form, Input, notification, Row, Card } from 'antd';
import { sendPassword } from '@/lib/update-password';


const UpdatePassword = () => {
  const [loading, setLoading] = useState(false);
  const { email } = useUserInfo();

  const handleForgetPassword = async (values:any) => {
    const payload = {
      password: values.password,
      email: email as string
    };
    try {      
      setLoading(true)
      const response = await sendPassword(payload);
      console.log('MAK', response);
      if(response){
        notification.success({
          message: "Password updated Successfully",
          duration: 3,
        });
      }
      setLoading(false)
    } catch (error:any) {
      console.log(error)
      notification.error({
        message: "Something went wrong",
        duration: 3,
      });
      setLoading(false);
    }
  }
  return (
    <section className="overflow-y-auto overflow-x-hidden w-full px-[16px] lg:px-[64px]">
      {/* <div className="mb-4 text-2xl font-bold xl:text-3xl">Update Password</div> */}
      <Card bodyStyle={{padding: '15px 24px' }}>
      <h1 className="text-left text-lg font-semibold text-[#0092B3] mb-5">
        Update Password
      </h1>
      <Form name="normal_login" size="large" onFinish={handleForgetPassword}>
        <Row gutter={10}>
          <Col span={24}>
            <Form.Item
              name="password"
              rules={[
                { required: true },

                {
                  validator: (rule, value) => {
                    const hasUppercase = /[A-Z]/.test(value);
                    const hasLowercase = /[a-z]/.test(value);
                    const hasNumber = /[0-9]/.test(value);
                    const hasSpecialChar = /[^a-zA-Z0-9 ]/.test(value);
                    if (!hasUppercase || !hasLowercase || !hasNumber || !hasSpecialChar) {
                      return Promise.reject('Password must be 8 characters long contains 1 upercase, 1 special character, 1 number');
                    }
                    return Promise.resolve();
                  },
                },
              ]}
            >
              <Input.Password type="password" placeholder={'Password'} />
            </Form.Item>
          </Col>
          <Col span={24}>
            <Form.Item
              name="confirmPassword"
              rules={[
                { required: true, message: 'Please input confirm password' },
                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue('password') === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error('The two passwords are inconsistent.'));
                  },
                }),
              ]}
            >
              <Input.Password type="password" placeholder='Confirm password' />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full !bg-[#0c2345]" loading={loading}>
            Update Password
          </Button>
        </Form.Item>                                                                                                                          
      </Form>
      </Card>
    </section>
  )
}

export default UpdatePassword