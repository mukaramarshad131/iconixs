'use client'
import CountryStateForm from '@/components/countryStatePhone';
import { SIGNUP_MUTATION, UPDATE_PATIENT, UPDATE_WEIGHT } from '@/graphql/query';
import { useMutation } from '@apollo/client';
import { Button, Col, DatePicker, Form, Input, notification, Radio, Row } from 'antd';
import dayjs from 'dayjs';


const SignUp = ({setIsLogin}:{setIsLogin:(value:boolean)=>void}) => {
      const [ mutateFunction,{  loading } ] = useMutation(SIGNUP_MUTATION);
      const [ updateFunction, ] = useMutation(UPDATE_PATIENT);
      const [ updateWeightFunction,] = useMutation(UPDATE_WEIGHT);

      const onFinish = async (values: any) => {
        const payload = {
          ...values,
          dob: dayjs(values.dob).format('DD/MM/YYYY'),
          role: 'patient',
          next_appt_date: null,
          provider_type: 'openloop',
          dietitian_id: '1322376',
        };

        try {
          const {
            data: {
              signUp: { user, messages = [] },
            },
          } = await mutateFunction({ variables: { ...payload } });
          if (messages?.length > 0) {
            notification.error({
              message: messages[0].message,
              duration: 3,
            });
            return 0;
          }
          if (user?.id) {
            const updatePayload = {
              input: {
                id: user.id,
                dietitian_id: '1322376',
                dob: dayjs(values.dob).format("DD/MM/YYYY"),
                height: payload.height,
                phone_number: payload.phone,
                additional_record_identifier: '',
                gender: payload.gender,
                location: {
                  country:payload.country,
                  state: payload.state,
                  city: payload.city,
                  zip: payload.zip,
                  line1: payload.line1,
                },
              },
            };
            const updateWeightPayload = {
              category: 'Weight',
              type: 'MetricEntry',
              metric_stat: payload.metric_stat,
              user_id: user.id,
              created_at: dayjs().format('DD/MM/YYYY'),
            };
            await updateFunction({ variables: { ...updatePayload } });
            await updateWeightFunction({ variables: { ...updateWeightPayload } });
          }
          notification.success({
            message: 'Update success!',
            duration: 3,
          });
          setIsLogin(true)
        } catch(error){
            throw error;
        }
      };
    
  return (
    <section className="overflow-y-auto overflow-x-hidden w-full px-[16px] lg:px-[64px]">
    <div className="mb-4 text-2xl font-bold xl:text-3xl">Sign up</div>
    <Form name="normal_login" size="large" initialValues={{ remember: true }} onFinish={onFinish}>
      <Row gutter={10}>
        <Col span={12}>
          <Form.Item
            name="first_name"
            rules={[{ required: true, message: 'Please input First Name' }]}
          >
            <Input placeholder="Enter First Name" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="last_name"
            rules={[{ required: true, message: 'Please input Last Name' }]}
          >
            <Input placeholder="Enter Last Name" />
          </Form.Item>
        </Col>
        <Col span={24}>
      <Form.Item
        name="email"
        rules={[{ required: true, type: 'email', message: 'Please input email' }]}
      >
        <Input placeholder='Email' />
      </Form.Item>
      </Col>
        <Col span={12}>
      <Form.Item name="dob" rules={[{ required: true, message: 'Please input date of birth' }]}>
        <DatePicker placeholder="Date of Birth" format="DD/MM/YYYY" style={{ width: '100%' }} />
      </Form.Item>
      </Col>
      <Col span={12}>
      <Form.Item
        name="gender"
        rules={[{ required: true, message: 'Please select gender' }]}
      >
        <Radio.Group>
          <Radio value="Female"> Female </Radio>
          <Radio value="Male"> Male </Radio>
        </Radio.Group>
      </Form.Item>
      </Col>
        <Col span={12}>
          <Form.Item
            name="height"
            rules={[{ required: true, message: 'Please input Height' }]}
          >
            <Input type='number' placeholder="Height" />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name="metric_stat"
            rules={[{ required: true, message: 'Please input Weight' }]}
          >
            <Input type='number' placeholder="Weight" />
          </Form.Item>
        </Col>
        <Col span={12}>
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
        <Col span={12}>
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
      <CountryStateForm noLabel/>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="w-full !bg-[#0c2345]" loading={loading}>
          Sign UP
        </Button>
      </Form.Item>
      <Button block type="link" onClick={()=>setIsLogin(true)}>
      <div className="flex items-center justify-center hover:underline">
        {/* <MdArrowBackIosNew /> */}
        <span className="text-sm">Back to Sign In</span>
      </div>
    </Button>
    </Form>
    {/* <Button onClick={handleUpdateWeight}>BBBB</Button> */}
  </section>
  )
}

export default SignUp