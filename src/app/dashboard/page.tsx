// import GAButton from '@/components/GAButton';
import BannerCard from '@/components/pages/dashboard/banner-card';
import GeneralTab from '@/components/pages/dashboard/general-tab';
import NewInvoice from '@/components/pages/dashboard/new-invoice';
import { Col, Row } from 'antd'
import { Metadata } from 'next';


export const metadata:Metadata={title: "Patient Details | Iconix Medical"};
export const dynamic = 'force-dynamic';

const PatientDetails = () => {
  return (
    <div className="p-2 w-full flex flex-col justify-center items-center">
    <Row gutter={[16, 16]} justify="center" className='!w-full'>
      <Col span={24} lg={24}>
        <BannerCard />
      </Col>
    </Row>
    {/* <GAButton /> */}
    <Row gutter={[16, 16]} className="mt-4 container xs:p-3" justify="center">
      <Col span={24} md={24} lg={24}>
        <NewInvoice />
      </Col>
    </Row>
    <div className='container'><GeneralTab /></div>
  </div>
  )
}

export default PatientDetails