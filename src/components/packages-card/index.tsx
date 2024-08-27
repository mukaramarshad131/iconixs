import { CrownOutlined } from '@ant-design/icons';
import { Badge, Button } from 'antd';
// import { useNavigate } from 'react-router-dom';

import Card from '@/components/card';
import { useUserActions, useUserInfo } from '@/store/userStore';

const businessPackages = [
  {
    id: 'ico-trt-cypionate-inj',
    discount: 24,
    backgroundColor: '#1B3352',
    packageName: 'Testosterone Cypionate Injection + Anastrozole',
    originalPrice: '$205.00 USD',
    description: 'Description',
  },
  {
    id: 'ico-trt-enclomiphene',
    discount: 24,
    backgroundColor: '#1B3352',
    packageName: 'Iconix TRT Enclomiphene',
    originalPrice: '$185.00 USD',
    description: 'Description',
  },
  {
    id: 'ico-trt-kyzatrex-oral',
    discount: 24,
    backgroundColor: '#1B3352',
    packageName: 'Iconix TRT Kyzatrex Oral',
    originalPrice: '$249.00 USD',
    description: 'Description',
  },
];
function PackagesCard() {
  // const navigate = useNavigate();
  const { setUserPlan } = useUserActions();
  const { firstName, lastName, zip, state } = useUserInfo();

  const handleCart = (planId: string) => {
    setUserPlan({ planId });
    window.open(
      `https://iconix-test.chargebee.com/hosted_pages/checkout?subscription_items[item_price_id][0]=${planId}-USD-Monthly&subscription_items[quantity][0]=1&customer[first_name]=Jose&customer[last_name]=Diaz&&customer[email]=diaz@gmail.com&billing_address[first_name]=${firstName}&billing_address[last_name]=${lastName}&billing_address[line1]=AddressLine1&billing_address[line2]=AddressLine2&billing_address[city]=Maxico&billing_address[zip]=${zip}&billing_address[state_code]=${state}&billing_address[country]=US`,
      '_blank',
    );
    // navigate('/dashboard/checkout');
  };
  return (
    <>
      <h1 className="p-5 text-center text-3xl font-semibold text-[#0092B3]">Packages Plan</h1>
      <div className="mb-5 flex flex-wrap items-center justify-center gap-5">
        {businessPackages?.map((data: any) => {
          return (
            <Card
              key={data.id}
              style={{ padding: '0px', height: 400, width: 330 }}
              className="relative z-0 rounded bg-[#F3F4F5] shadow-[rgba(50,50,93,0.25)_0px_6px_12px_-2px,_rgba(0,0,0,0.3)_0px_3px_7px_-3px]"
            >
              <Badge.Ribbon
                text={data.discount}
                color="red"
                style={{ padding: 8 }}
                className="absolute top-[20px] z-10"
              />
              <div
                className="absolute left-[125px] top-[120px] z-10 flex h-[70px] w-[70px] items-center justify-center bg-[#D1D6DA]"
                style={{ borderRadius: '50%' }}
              >
                <CrownOutlined style={{ fontSize: 50, color: '#c9a112' }} />
              </div>
              <div
                style={{
                  borderTopLeftRadius: '10px',
                  borderTopRightRadius: '10px',
                  paddingBottom: '80px',
                  background: data?.backgroundColor,
                  paddingTop: '25px',
                  clipPath: 'polygon(0 0,100% 0, 100% 71%, 0 100%)',
                }}
                className="flex w-full flex-col px-5 text-center"
              >
                <div className="mt-[37px] flex flex-col">
                  <span className="text-[#D1D6DA]">{data.originalPrice}</span>
                </div>
              </div>

              <div
                style={{ borderBottomLeftRadius: '10px', borderBottomRightRadius: '10px' }}
                className=" bg-[#F3F4F5] p-3 py-5"
              >
                <p>
                  {data.description}
                  <ul className="mb-5 mt-5 text-[15px] font-semibold">
                    <span className="bold-1 text-lg"> {data.packageName}</span>
                  </ul>
                </p>
              </div>
              <div className="absolute bottom-3 flex w-full items-center justify-center p-5">
                <Button
                  onClick={() => handleCart(data.id)}
                  style={{
                    background: data?.backgroundColor,
                    borderRadius: 10,
                    color: 'white',
                    fontSize: '18px',
                    padding: '20px 0px',
                  }}
                  className="w-3/4"
                >
                  Subscribe
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </>
  );
}

export default PackagesCard;
