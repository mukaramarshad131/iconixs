import { Row, Col, Typography } from 'antd';

import Card from '@/components/card';
import { Iconify } from '@/components/icon';
import { useUserInfo } from '@/store/userStore';

export default function ProfileTab() {
  const { username, email, phoneNumber } = useUserInfo();

  const AboutItems = [
    { icon: <Iconify icon="fa-solid:user" size={18} />, label: 'Full Name', val: username },
    { icon: <Iconify icon="tabler:location-filled" size={18} />, label: 'Country', val: 'USA' },
    { icon: <Iconify icon="ph:phone-fill" size={18} />, label: 'Contact', val: phoneNumber },
    { icon: <Iconify icon="ic:baseline-email" size={18} />, label: 'Email', val: email },
  ];

  return (
    <>
      <Row gutter={[16, 16]}>
        <Col span={24} md={12} lg={8}>
          <Card className="flex-col">
            <div className="flex w-full flex-col">
              <Typography.Title level={5}>About</Typography.Title>

              <div className="mt-2 flex flex-col gap-4">
                {AboutItems.map((item, index) => (
                  <div className="flex" key={index}>
                    <div className="mr-2">{item.icon}</div>
                    <div className="mr-2">{item.label}:</div>
                    <div className="opacity-50">{item.val}</div>
                  </div>
                ))}
              </div>
            </div>
          </Card>
        </Col>

        {/* <Col span={24} md={12} lg={16}>
          <Card className="flex-col !items-start">
            <Typography.Title level={5}>Activity Timeline</Typography.Title>
            <Timeline
              className="!mt-4 w-full"
              items={[
                {
                  color: theme.colorError,
                  children: (
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <Typography.Text strong>8 Invoices have been paid</Typography.Text>
                        <div className="opacity-50">Wednesday</div>
                      </div>
                      <Typography.Text type="secondary" className="text-xs">
                        Invoices have been paid to the company.
                      </Typography.Text>

                      <div className="mt-2 flex items-center gap-2">
                        <SvgIcon icon="ic_file_pdf" size={30} />
                        <span className="font-medium opacity-60">invoice.pdf</span>
                      </div>
                    </div>
                  ),
                },
                {
                  color: theme.colorPrimaryActive,
                  children: (
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <Typography.Text strong>Create a new project for client 😎</Typography.Text>
                        <div className="opacity-50">April, 18</div>
                      </div>
                      <Typography.Text type="secondary" className="text-xs">
                        Invoices have been paid to the company.
                      </Typography.Text>
                      <div className="mt-2 flex items-center gap-2">
                        <img
                          alt=""
                          src={faker.image.avatarLegacy()}
                          className="h-8 w-8 rounded-full"
                        />
                        <span className="font-medium opacity-60">
                          {faker.person.fullName()} (client)
                        </span>
                      </div>
                    </div>
                  ),
                },
                {
                  color: theme.colorInfo,
                  children: (
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <Typography.Text strong>Order #37745 from September</Typography.Text>
                        <div className="opacity-50">January, 10</div>
                      </div>
                      <Typography.Text type="secondary" className="text-xs">
                        Invoices have been paid to the company.
                      </Typography.Text>
                    </div>
                  ),
                },
                {
                  color: theme.colorWarning,
                  children: (
                    <div className="flex flex-col">
                      <div className="flex items-center justify-between">
                        <Typography.Text strong>Public Meeting</Typography.Text>
                        <div className="opacity-50">September, 30</div>
                      </div>
                    </div>
                  ),
                },
              ]}
            />
          </Card>
        </Col> */}
      </Row>
      {/* <Row gutter={[16, 16]} className="mt-4">
        <Col span={24} md={12}>
          <Card className="flex-col !items-start">
            <div className="flex w-full items-center justify-between">
              <Typography.Title level={5}>Connections</Typography.Title>
              <IconButton>
                <Iconify icon="fontisto:more-v-a" />
              </IconButton>
            </div>
            <div className="mt-2 flex w-full flex-col gap-4">
              {ConnectionsItems.map((item, index) => (
                <div className="flex" key={index}>
                  <img alt="" src={item.avatar} className="h-10 w-10 flex-none rounded-full" />
                  <div className="ml-4 flex flex-1 flex-col">
                    <span className="font-semibold">{item.name}</span>
                    <span className="mt-1 text-xs opacity-50">{item.connections}</span>
                  </div>
                  <div
                    className="flex h-9 w-9 flex-none items-center justify-center rounded"
                    style={{
                      backgroundColor: item.connected ? theme.colorPrimaryText : 'transparent',
                      border: item.connected ? '' : `1px solid ${theme.colorPrimaryText}`,
                    }}
                  >
                    <Iconify
                      icon="tdesign:user"
                      color={item.connected ? '#fff' : theme.colorPrimaryText}
                      size={20}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div
              className="mt-4 w-full text-center text-lg"
              style={{ color: theme.colorPrimaryText }}
            >
              View all connections
            </div>
          </Card>
        </Col>
        <Col span={24} md={12}>
          <Card className="flex-col !items-start">
            <div className="flex w-full items-center justify-between">
              <Typography.Title level={5}>Teams</Typography.Title>
              <IconButton>
                <Iconify icon="fontisto:more-v-a" />
              </IconButton>
            </div>
            <div className="mt-2 flex w-full flex-col gap-4">
              {TeamItems.map((item, index) => (
                <div className="flex" key={index}>
                  {item.avatar}
                  <div className="ml-4 flex flex-1 flex-col">
                    <span className="font-semibold">{item.name}</span>
                    <span className="mt-1 text-xs opacity-50">{item.members}</span>
                  </div>
                  {item.tag}
                </div>
              ))}
            </div>

            <div
              className="mt-4 w-full text-center text-lg"
              style={{ color: theme.colorPrimaryText }}
            >
              View all members
            </div>
          </Card>
        </Col>
      </Row>
      <Row gutter={[16, 16]} className="mt-4">
        <Col span={24}>
          <Card className="flex-col !items-start">
            <Typography.Title level={5}>Projects</Typography.Title>
            <div className="!mt-4 w-full">
              <Scrollbar>
                <Table
                  rowSelection={{ type: 'checkbox' }}
                  columns={ProjectColumns}
                  dataSource={fakeProjectItems()}
                />
              </Scrollbar>
            </div>
          </Card>
        </Col>
      </Row> */}
    </>
  );
}
