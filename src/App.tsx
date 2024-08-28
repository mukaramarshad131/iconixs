import { App as AntdApp } from 'antd';

import Logo from '@/assets/icons/IconixLogo.svg';
import Router from '@/router/index';
import AntdConfig from '@/theme/antd';

import { MotionLazy } from './components/animate/motion-lazy';

function App() {
  return (
    <AntdConfig>
      <AntdApp>
        <MotionLazy>
          {/* <Helmet> */}
          <title>Iconix Medical</title>
          <link rel="icon" href={Logo} />
          {/* </Helmet> */}
          <Router />
        </MotionLazy>
      </AntdApp>
    </AntdConfig>
  );
}

export default App;
