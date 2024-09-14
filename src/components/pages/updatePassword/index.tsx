'use client'
import { UPDATE_PATIENT } from '@/graphql/query';
import { useMutation } from '@apollo/client';
import { useUserInfo } from '@/store/userStore';
import { Button, Col, Form, Input, notification, Row } from 'antd';


const UpdatePassword = () => {
  const { id } = useUserInfo();
  const [updateFunction, {loading}] = useMutation(UPDATE_PATIENT);

  const onFinish = async (values: any) => {
    const payload = {
      input: {
        id,
        password: values.password
      },
    };

    try {
      await updateFunction({ variables: { ...payload } });
      notification.success({
        message: 'Password Updated success!',
        duration: 3,
      });
    } catch (error) {
      throw error;
    }
  };

  return (
    <section className="overflow-y-auto overflow-x-hidden w-full px-[16px] lg:px-[64px]">
      <div className="mb-4 text-2xl font-bold xl:text-3xl">Update Password</div>
      <Form name="normal_login" size="large" initialValues={{ remember: true }} onFinish={onFinish}>
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
    </section>
  )
}

export default UpdatePassword