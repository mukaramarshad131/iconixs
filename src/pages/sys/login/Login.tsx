import { Layout } from 'antd';
import { Navigate } from 'react-router-dom';

import iconix from '@/assets/images/IconixLogo.png';
import dashboardimg from '@/assets/images/loginPageImg.jpg';
import LocalePicker from '@/components/locale-picker';
import { useUserToken } from '@/store/userStore';

import LoginForm from './LoginForm';
import { LoginStateProvider } from './providers/LoginStateProvider';
import RegisterForm from './RegisterForm';
import ResetForm from './ResetForm';

const { VITE_APP_HOMEPAGE: HOMEPAGE } = import.meta.env;

function Login() {
  const token = useUserToken();

  if (token.accessToken) {
    return <Navigate to={HOMEPAGE} replace />;
  }
  return (
    <Layout className="relative flex !min-h-screen !w-full !flex-row">
      <div
        className="hidden grow flex-col items-center justify-around bg-center bg-no-repeat md:flex"
        style={{
          background: '#0c2345',
        }}
      >
        <div className="text-3xl font-bold leading-normal lg:text-4xl xl:text-5xl">
          <img className="mt-[20px] max-w-[300px] xl:max-w-[200px]" src={iconix} alt="Iconix" />
        </div>
        <img className="max-w-[400px] xl:max-w-[450px]" src={dashboardimg} alt="" />
        {/* <p className="text-3xl font-bold text-[#37466E]"> {t('sys.login.quote')}</p> */}
      </div>

      <div className="m-auto flex !h-screen w-full max-w-[580px] flex-col justify-center px-[16px] lg:px-[64px]">
        <LoginStateProvider>
          <LoginForm />
          <RegisterForm />
          <ResetForm />
        </LoginStateProvider>
      </div>

      <div className="absolute right-2 top-0">
        <LocalePicker />
      </div>
    </Layout>
  );
}
export default Login;
