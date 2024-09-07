import BannerCard from '@/components/pages/dashboard/banner-card';
import GeneralTab from '@/components/pages/dashboard/general-tab';
import NewInvoice from '@/components/pages/dashboard/new-invoice';
import { Col, Row } from 'antd'
import { Metadata } from 'next';


export const metadata:Metadata={title: "Patient Details | Iconix Medical"};
export const dynamic = 'force-dynamic';

const PatientDetails = () => {
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
  )
}

export default PatientDetails