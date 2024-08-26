import { Col, Row } from 'antd';

import GeneralTab from '../patientDetails2/general-tab';

import BannerCard from './banner-card';
import NewInvoice from './new-invoice';

function Workbench() {
  return (
    <div className="p-2">
      <Row gutter={[16, 16]} justify="center">
        <Col span={24} lg={24}>
          <BannerCard />
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-4" justify="center">
        <Col span={24} md={24} lg={24}>
          <NewInvoice />
        </Col>
      </Row>
      <GeneralTab />
    </div>
  );
}

export default Workbench;
