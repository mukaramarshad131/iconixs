'use client'
import { LOGIN_MUTATION, OPEN_LOOP_INVOICES_LIST, USER_QUERY } from '@/graphql/query';
import { useUserActions } from '@/store/userStore';
import { useMutation, useQuery } from '@apollo/client';
import { Button, Checkbox, Col, Divider, Form, Row, Input, notification } from 'antd'
import { useRouter } from 'next/navigation';

const Login = ({setIsLogin}:{setIsLogin:(value:boolean)=>void}) => {
      const [ mutateFunction, { loading } ] = useMutation(LOGIN_MUTATION);
      const { data} = useQuery(USER_QUERY, { variables: { id: '1412694' } });
      const { data: invoicData} = useQuery(OPEN_LOOP_INVOICES_LIST, { variables: { id: '1412694' }});
      const { setUserToken, setUserInfo, setUserPermissions} = useUserActions();
      const router = useRouter();

        console.log(invoicData, data)
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
          const permissions=["/dashboard", "/dashboard/intake-form"]

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
          rules={[{ required: true, message: 'Username is required.' }]}
        >
          <Input type="text" placeholder='Please enter Username' />
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
            {/* <Col span={12} className="text-right">
              <button
                className="!underline"
                onClick={() => setLoginState(LoginStateEnum.RESET_PASSWORD)}
              >
                {t('sys.login.forgetPassword')}
              </button>
            </Col> */}
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
    </section>
  )
}

export default Login