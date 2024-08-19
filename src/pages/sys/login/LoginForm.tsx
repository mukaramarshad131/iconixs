import { useMutation, useQuery } from '@apollo/client';
import { Button, Checkbox, Col, Divider, Form, Input, Row } from 'antd';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { DEFAULT_USER } from '@/_mock/assets';
import { UserPermissions, fakeRole } from '@/_mock/utils';
import { SignInReq } from '@/api/services/userService';
import { LOGIN_MUTATION, USER_QUERY } from '@/graphql/query';
import { useUserActions } from '@/store/userStore';

// import { useThemeToken } from '@/theme/hooks';

import { LoginStateEnum, useLoginStateContext } from './providers/LoginStateProvider';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;
function LoginForm() {
  const { t } = useTranslation();
  const navigatge = useNavigate();
  const { setUserToken, setUserInfo } = useUserActions();
  // const themeToken = useThemeToken();
  const [loading, setLoading] = useState(false);

  const { loginState, setLoginState } = useLoginStateContext();
  // const signIn = useSignIn();
  const [
    mutateFunction,
    // { data, loading: loginLoading, error: loginError }
  ] = useMutation(LOGIN_MUTATION);

  const {
    // loading: userLoading,
    // error,
    data,
  } = useQuery(USER_QUERY, {
    variables: { id: '1412694' },
  });

  if (loginState !== LoginStateEnum.LOGIN) return null;

  const handleFinish = async ({ username, password }: SignInReq) => {
    setLoading(true);
    try {
      const login = {
        email: username,
        password,
        tokenAPI: true,
        multipleAPI: true,
        dietitian_id: '1322376',
      };

      const accessToken = '387f3e57-9c4b-46a3-bd66-cbac6a60aad2';
      const refreshToken = '1c4eff0e-15cc-4d12-95a1-7a29df87df0e';
      const msk = {
        avatar:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/297.jpg',
        createdAt: '2023-12-28T06:33:44.883Z',
        updatedAt: '2024-08-06T14:47:47.014Z',
        password: '@Junaid@2024',
        role: fakeRole(),
        permissions: UserPermissions(),
      };
      const {
        data: { signIn: signUser },
      } = await mutateFunction({ variables: { ...login } });
      if (signUser.user) {
        const test = {
          ...msk,
          ...signUser.user,
          username: `${signUser.user.first_name} ${signUser.user.last_name}`,
          firstName: signUser.user.first_name,
          lastName: signUser.user.last_name,
          phoneNumber: signUser.user.phone_number,
        };
        setUserToken({ accessToken, refreshToken });
        setUserInfo(test);
        navigatge(HOMEPAGE, { replace: true });
      }
      // await signIn({ username, password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="mb-4 text-2xl font-bold xl:text-3xl">{t('sys.login.signInFormTitle')}</div>
      {console.log('data: ', data)}
      <Form
        name="login"
        size="large"
        initialValues={{
          remember: true,
          username: DEFAULT_USER.username,
          password: DEFAULT_USER.password,
        }}
        onFinish={handleFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: t('sys.login.emaildPlaceholder') }]}
        >
          <Input type="email" placeholder={t('sys.login.email')} />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: t('sys.login.passwordPlaceholder') }]}
        >
          <Input.Password type="password" placeholder={t('sys.login.password')} />
        </Form.Item>
        <Form.Item>
          <Row>
            <Col span={12}>
              <Form.Item name="remember" valuePropName="checked" noStyle>
                <Checkbox>{t('sys.login.rememberMe')}</Checkbox>
              </Form.Item>
            </Col>
            <Col span={12} className="text-right">
              <button
                className="!underline"
                onClick={() => setLoginState(LoginStateEnum.RESET_PASSWORD)}
              >
                {t('sys.login.forgetPassword')}
              </button>
            </Col>
          </Row>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit" className="w-full" loading={loading}>
            {t('sys.login.loginButton')}
          </Button>
        </Form.Item>
        <Divider className="!text-xs">
          <div onClick={() => setLoginState(LoginStateEnum.REGISTER)}>
            <Button className="w-full !text-sm">{t('sys.login.signUpFormTitle')}</Button>
          </div>
        </Divider>
      </Form>
    </>
  );
}

export default LoginForm;
