import { App as AntdApp } from 'antd';
import { ChargeBee } from 'chargebee-typescript';
import { Helmet } from 'react-helmet-async';

import Logo from '@/assets/images/logo.png';
import Router from '@/router/index';
import AntdConfig from '@/theme/antd';

import { MotionLazy } from './components/animate/motion-lazy';

const chargebee = new ChargeBee();

chargebee.configure({
  site: 'iconix-test',
  api_key: 'test_S9e9KSksS9Tt3elMHLUIq1Zls1cbs4sy',
});

function App() {
  return (
    <AntdConfig>
      <AntdApp>
        <MotionLazy>
          <Helmet>
            <title>Slash Admin</title>
            <link rel="icon" href={Logo} />
          </Helmet>

          <Router />
        </MotionLazy>
      </AntdApp>
    </AntdConfig>
  );
}

export default App;
